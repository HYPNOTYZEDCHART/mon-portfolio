Formulaire Vercel

Le site utilise maintenant /api/contact, une fonction Vercel qui envoie les messages avec Resend.

Dans Vercel > Project > Settings > Environment Variables, ajoutez :
- RESEND_API_KEY : votre clé API Resend
- CONTACT_FROM_EMAIL : une adresse expéditrice vérifiée dans Resend
- CONTACT_TO_EMAIL : doumbiabecaye7@gmail.com

Pour les tests locaux, copiez .env.example sous le nom .env.local et complétez les valeurs.
Ne publiez jamais .env.local, une clé API Resend ou forms/config.local.php.
