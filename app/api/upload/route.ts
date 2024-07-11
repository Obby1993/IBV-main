import { Options } from 'multer-storage-cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import cloudinary from '../../../lib/cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Request, Response } from 'express';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'events', // Nom du dossier où les images seront stockées sur Cloudinary
  } as Options['params'],
});

const upload = multer({ storage: storage });

// Nouveau format pour la configuration de l'API
export const runtime = 'nodejs'; // Choisissez 'edge' ou 'nodejs' selon vos besoins

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

const uploadMiddleware = upload.single('file');

export async function POST(req: NextRequest) {
  return new Promise<NextResponse>((resolve, reject) => {
    uploadMiddleware(req as unknown as Request, {} as Response, (err: any) => {
      if (err) {
        reject(new Error('Erreur lors du téléchargement de l\'image'));
        return resolve(NextResponse.json({ error: 'Erreur lors du téléchargement de l\'image' }, { status: 500 }));
      }
      const { file } = req as any;
      if (!file) {
        reject(new Error('Aucun fichier téléchargé'));
        return resolve(NextResponse.json({ error: 'Aucun fichier téléchargé' }, { status: 400 }));
      }
      resolve(NextResponse.json({ url: file.path }));
    });
  });
}
