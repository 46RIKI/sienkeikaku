import React, { FC, useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Types
interface Plan {
  id: string;
  title: string;
  clientName: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface PlanListProps {}

const PlanList: FC<PlanListProps> = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    const mockPlans: Plan[] = [
      {
        id: '1',
        title: '田中太郎様の利用計画',
        clientName: '田中太郎',
        status: 'approved',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        createdBy: '担当者A',
      },
      {
        id: '2',
        title: '佐藤花子様の利用計画',
        clientName: '佐藤花子',
        status: 'draft',
        createdAt: '2024-01-18',
        updatedAt: '2024-01-18',
        createdBy: '担当者B',
      },
      {
        id: '3',
        title: '鈴木一郎様の利用計画',
        clientName: '鈴木一郎',
        status: 'submitted',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-15',
        createdBy: '担当者A',
      },
    ];

    setTimeout(() => {
      setPlans(mockPlans);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'submitted':
        return 'info';
      case 'draft':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return '承認済み';
      case 'submitted':
        return '提出済み';
      case 'draft':
        return '下書き';
      case 'rejected':
        return '却下';
      default:
        return status;
    }
  };

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateNew = () => {
    navigate('/editor/new');
  };

  const handleEdit = (planId: string) => {
    navigate(`/editor/${planId}`);
  };

  const handleView = (planId: string) => {
    navigate(`/plan/${planId}`);
  };

  const handleDelete = (plan: Plan) => {
    setPlanToDelete(plan);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (planToDelete) {
      setPlans(plans.filter(plan => plan.id !== planToDelete.id));
      setDeleteDialogOpen(false);
      setPlanToDelete(null);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          利用計画一覧
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
          sx={{ minWidth: 150 }}
        >
          新規作成
        </Button>
      </Box>

      {/* Search and Filter */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="検索"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>ステータス</InputLabel>
          <Select
            value={statusFilter}
            label="ステータス"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">すべて</MenuItem>
            <MenuItem value="draft">下書き</MenuItem>
            <MenuItem value="submitted">提出済み</MenuItem>
            <MenuItem value="approved">承認済み</MenuItem>
            <MenuItem value="rejected">却下</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Plans Grid */}
      {filteredPlans.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          利用計画が見つかりません。
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredPlans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {plan.title}
                    </Typography>
                    <Chip
                      label={getStatusLabel(plan.status)}
                      color={getStatusColor(plan.status) as any}
                      size="small"
                    />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    利用者: {plan.clientName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    作成者: {plan.createdBy}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    作成日: {new Date(plan.createdAt).toLocaleDateString('ja-JP')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    更新日: {new Date(plan.updatedAt).toLocaleDateString('ja-JP')}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleView(plan.id)}
                      title="表示"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(plan.id)}
                      title="編集"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(plan)}
                      title="削除"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>利用計画の削除</DialogTitle>
        <DialogContent>
          <Typography>
            「{planToDelete?.title}」を削除しますか？この操作は取り消せません。
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>キャンセル</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PlanList; 