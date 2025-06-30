# 障害者支援利用計画自動作成システム

## 概要

このシステムは、障害者の支援利用計画作成業務において、ボイスメモなどの音声データから重要な情報を自動抽出・分類し、予め設定された雛形に自動出力することで、相談支援専門員の計画作成業務を大幅に効率化し、品質の向上を図ることを目的としています。

## 技術スタック

- **フロントエンド**: React.js + TypeScript
- **UI フレームワーク**: Material-UI (MUI)
- **ルーティング**: React Router
- **状態管理**: React Query
- **バックエンド**: Supabase (予定)
- **音声処理**: Google Cloud Speech-to-Text API (予定)
- **AI処理**: Google Gemini API (予定)

## 機能

### 1. ダッシュボード
- 計画書作成状況の統計表示
- 最近の計画書一覧
- クイックアクション

### 2. 音声アップロード
- ドラッグ&ドロップによる音声ファイルアップロード
- 対応形式: MP3, WAV, M4A, OGG
- 最大ファイルサイズ: 100MB
- アップロード進捗表示

### 3. 計画書一覧
- 作成済み計画書の一覧表示
- 検索・フィルタリング機能
- ページネーション
- ステータス管理

### 4. 計画書編集
- ステップ形式での計画書編集
- 基本情報、現状・アセスメント、支援目標、サービス利用計画、支援体制、モニタリング計画の6ステップ
- リアルタイム保存

### 5. 計画書詳細表示
- 完成した計画書の詳細表示
- PDF出力機能
- 印刷対応

## セットアップ

### 前提条件

- Node.js 16.0.0以上
- npm または yarn

### インストール

1. リポジトリをクローン
```bash
git clone [repository-url]
cd 福祉利用サービス　利用計画
```

2. 依存関係をインストール
```bash
npm install
```

3. 開発サーバーを起動
```bash
npm start
```

4. ブラウザで http://localhost:3000 にアクセス

### ビルド

本番用ビルドを作成する場合:

```bash
npm run build
```

## プロジェクト構造

```
src/
├── components/          # 共通コンポーネント
│   └── Layout/         # レイアウトコンポーネント
├── pages/              # ページコンポーネント
│   ├── Dashboard/      # ダッシュボード
│   ├── AudioUpload/    # 音声アップロード
│   ├── PlanList/       # 計画書一覧
│   ├── PlanEditor/     # 計画書編集
│   └── PlanView/       # 計画書詳細表示
├── types/              # TypeScript型定義
├── utils/              # ユーティリティ関数
├── hooks/              # カスタムフック
└── services/           # APIサービス

```

## 開発ガイドライン

### コーディング規約

- TypeScriptを使用
- ESLintとPrettierを使用
- コンポーネントは関数コンポーネントとHooksを使用
- Material-UIのコンポーネントを優先使用

### コンポーネント作成

新しいコンポーネントを作成する際は、以下の構造に従ってください:

```typescript
import React from 'react';
import { Box, Typography } from '@mui/material';

interface ComponentProps {
  // プロパティの型定義
}

const Component: React.FC<ComponentProps> = ({ /* props */ }) => {
  return (
    <Box>
      <Typography>コンポーネント内容</Typography>
    </Box>
  );
};

export default Component;
```

## 今後の実装予定

### Phase 1 (現在)
- [x] フロントエンド基本構造
- [x] ダッシュボード
- [x] 音声アップロード画面
- [x] 計画書一覧・編集・詳細表示

### Phase 2
- [ ] Supabase連携
- [ ] 音声ファイルアップロード機能
- [ ] Google Cloud Speech-to-Text API連携
- [ ] Google Gemini API連携

### Phase 3
- [ ] PDF出力機能
- [ ] 印刷レイアウト最適化
- [ ] ユーザー認証・権限管理
- [ ] データバックアップ機能

### Phase 4
- [ ] モバイル対応
- [ ] オフライン機能
- [ ] パフォーマンス最適化
- [ ] セキュリティ強化

## ライセンス

このプロジェクトは内部使用を目的としています。

## サポート

技術的な質問や問題がある場合は、開発チームまでお問い合わせください。 