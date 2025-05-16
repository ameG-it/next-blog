This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Project Documentation

## フォルダ構成

- `src/app/auth`: 認証に関連する機能を含むフォルダです。ユーザー登録、ログイン、ログアウト、その他関連機能のファイルが含まれています。

- `src/app/public`: ログインせずにアクセス可能なページを含むフォルダです。公開されているコンテンツや情報のファイルが含まれています。

- `src/app/private`: 認証後にのみアクセス可能なページを含むフォルダです。ログイン後に利用できるコンテンツや機能のファイルが含まれています。

- `src/types/index.ts`: プロジェクト全体で使用される型定義を含むファイルです。TypeScript の型を定義し、他のファイルで使用するためにエクスポートしています。

- `tsconfig.json`: TypeScript の設定ファイルです。コンパイラオプションやコンパイル対象のファイルを指定します。

- `package.json`: npm の設定ファイルです。プロジェクトの依存関係やスクリプトが記載されています。

- `README.md`: プロジェクトのドキュメントを含むファイルです。フォルダ構成の説明などが記載されています。
