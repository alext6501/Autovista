import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(path.resolve(__dirname, 'dist'));

app.use(express.json());

// Health check endpoint for cloud hosting probes (Cloud Run, Kubernetes, AWS, Render)
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'AutoVista',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

async function startServer() {
  if (isProduction) {
    const distPath = path.resolve(__dirname, 'dist');
    
    // Serve static files with caching
    app.use(
      express.static(distPath, {
        maxAge: '1h',
      })
    );

    // SPA fallback: send index.html for all client routes
    app.get('*', (_req: Request, res: Response) => {
      const indexPath = path.resolve(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Application build not found. Please run "npm run build".');
      }
    });
  } else {
    // In dev mode, dynamically import and mount Vite middlewares
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[AutoVista] Server running on http://0.0.0.0:${PORT} (Mode: ${isProduction ? 'Production' : 'Development'})`);
  });
}

startServer().catch((err) => {
  console.error('[AutoVista] Failed to start server:', err);
  process.exit(1);
});
