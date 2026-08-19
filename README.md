# DentalKab

Proyecto Next.js con TypeScript, Tailwind CSS 4, Prisma 7 y Supabase (auth + Postgres).

## Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- React 19
- Tailwind CSS 4
- Prisma 7 + `@prisma/adapter-pg`
- Supabase (`@supabase/ssr`) para autenticación

## Desarrollo local

```bash
npm install
cp .env.example .env
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Base de datos

```bash
npm run db:migrate       # crear/aplicar migraciones en desarrollo
npm run db:migrate:deploy # aplicar migraciones en producción
npm run db:studio        # explorar la base de datos
```
