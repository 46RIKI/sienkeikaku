import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  AudioFile as AudioFileIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
}

const AudioUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // シミュレートされたアップロード処理
    newFiles.forEach((file) => {
      simulateUpload(file.id);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: true,
  });

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            const newProgress = file.progress + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              return {
                ...file,
                progress: 100,
                status: 'processing',
              };
            }
            return { ...file, progress: newProgress };
          }
          return file;
        })
      );
    }, 200);

    // 処理完了のシミュレーション
    setTimeout(() => {
      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === fileId
            ? { ...file, status: 'completed' }
            : file
        )
      );
    }, 3000);
  };

  const handleProcessAll = () => {
    setIsProcessing(true);
    // 実際の処理では、ここでSupabase Functionsを呼び出す
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/plans');
    }, 5000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <AudioFileIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'error':
        return 'error';
      case 'processing':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const completedFiles = uploadedFiles.filter((file) => file.status === 'completed');
  const hasCompletedFiles = completedFiles.length > 0;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        音声アップロード
      </Typography>

      <Grid container spacing={3}>
        {/* アップロードエリア */}
        <Grid item xs={12} md={8}>
          <Paper
            {...getRootProps()}
            sx={{
              p: 4,
              textAlign: 'center',
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover',
              },
            }}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {isDragActive
                ? 'ファイルをここにドロップしてください'
                : '音声ファイルをドラッグ&ドロップまたはクリックして選択'}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              対応形式: MP3, WAV, M4A, OGG (最大100MB)
            </Typography>
            <Button variant="contained" component="span">
              ファイルを選択
            </Button>
          </Paper>
        </Grid>

        {/* 処理ボタン */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              処理状況
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              アップロード完了: {completedFiles.length} / {uploadedFiles.length}
            </Typography>
            {hasCompletedFiles && (
              <Button
                variant="contained"
                fullWidth
                onClick={handleProcessAll}
                disabled={isProcessing}
                sx={{ mb: 2 }}
              >
                {isProcessing ? '処理中...' : 'AI分析を開始'}
              </Button>
            )}
            {isProcessing && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  AIによる音声分析と情報抽出を実行中...
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* アップロードされたファイル一覧 */}
        {uploadedFiles.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                アップロードされたファイル
              </Typography>
              <Grid container spacing={2}>
                {uploadedFiles.map((file) => (
                  <Grid item xs={12} key={file.id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          {getStatusIcon(file.status)}
                          <Box sx={{ ml: 2, flexGrow: 1 }}>
                            <Typography variant="subtitle1">{file.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {formatFileSize(file.size)}
                            </Typography>
                          </Box>
                          <Chip
                            label={file.status}
                            color={getStatusColor(file.status) as any}
                            size="small"
                          />
                        </Box>
                        {file.status === 'uploading' && (
                          <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" value={file.progress} />
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {file.progress}% 完了
                            </Typography>
                          </Box>
                        )}
                        {file.status === 'processing' && (
                          <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              AI分析中...
                            </Typography>
                          </Box>
                        )}
                        {file.error && (
                          <Alert severity="error" sx={{ mt: 1 }}>
                            {file.error}
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AudioUpload; 