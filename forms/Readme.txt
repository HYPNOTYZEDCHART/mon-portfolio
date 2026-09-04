Deux backends de formulaire

Le formulaire de la page d’accueil utilise `/api/contact`, une fonction Vercel qui envoie les messages avec Resend.
Le fichier `/forms/contact.php` est conservé comme backend PHP autonome pour un hébergement classique
(Apache, Nginx ou mutualisé avec PHP). Il utilise PHPMailer et peut remplacer l’endpoint Vercel dans ce cas.

## Déploiement Vercel

Dans Vercel > Project > Settings > Environment Variables, ajoutez :
- RESEND_API_KEY : votre clé API Resend
- CONTACT_FROM_EMAIL : une adresse expéditrice vérifiée dans Resend
- CONTACT_TO_EMAIL : doumbiabecaye7@gmail.com

Pour les tests locaux, copiez .env.example sous le nom .env.local et complétez les valeurs.
Ne publiez jamais .env.local, une clé API Resend ou forms/config.local.php.

## Déploiement PHP

Copiez `config.example.php` vers `config.local.php`, renseignez les identifiants SMTP,
puis utilisez `/forms/contact.php` comme action du formulaire. Le fichier `config.local.php`
est exclu de Git et ne doit jamais être rendu public.
