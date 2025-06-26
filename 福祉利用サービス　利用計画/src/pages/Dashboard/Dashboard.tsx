import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Upload as UploadIcon,
  Description as DescriptionIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // ダミーデータ
  const stats = {
    totalPlans: 156,
    completedPlans: 142,
    pendingPlans: 14,
    thisMonth: 23,
  };

  const recentPlans = [
    { id: 1, name: '田中太郎', status: 'completed', date: '2024-01-15' },
    { id: 2, name: '佐藤花子', status: 'pending', date: '2024-01-14' },
    { id: 3, name: '鈴木一郎', status: 'completed', date: '2024-01-13' },
    { id: 4, name: '高橋美咲', status: 'pending', date: '2024-01-12' },
  ];

  const quickActions = [
    {
      title: '音声アップロード',
      description: '新しい音声ファイルをアップロードして計画書を作成',
      icon: <UploadIcon />,
      action: () => navigate('/upload'),
      color: '#1976d2',
    },
    {
      title: '計画書一覧',
      description: '作成済みの計画書を確認・編集',
      icon: <DescriptionIcon />,
      action: () => navigate('/plans'),
      color: '#388e3c',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ダッシュボード
      </Typography>

      {/* 統計カード */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                総計画書数
              </Typography>
              <Typography variant="h4">{stats.totalPlans}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                完了済み
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.completedPlans}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                未完了
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.pendingPlans}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                今月作成
              </Typography>
              <Typography variant="h4" color="primary.main">
                {stats.thisMonth}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* クイックアクション */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              クイックアクション
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { boxShadow: 3 },
                      borderLeft: `4px solid ${action.color}`,
                    }}
                    onClick={action.action}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ color: action.color, mr: 2 }}>
                          {action.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6">{action.title}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {action.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* 最近の計画書 */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              最近の計画書
            </Typography>
            <List>
              {recentPlans.map((plan) => (
                <ListItem key={plan.id} divider>
                  <ListItemIcon>
                    {plan.status === 'completed' ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <WarningIcon color="warning" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={plan.name}
                    secondary={`作成日: ${plan.date}`}
                  />
                  <Button
                    size="small"
                    onClick={() => navigate(`/plan/${plan.id}`)}
                  >
                    詳細
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 