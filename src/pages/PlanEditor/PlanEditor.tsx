import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Save as SaveIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

interface PlanData {
  createdAt?: string;
  creator?: string;
  supportCoordinatorName?: string;
  contact?: string;
  basicInfo: {
    name: string;
    birthDate: string;
    gender: string;
    address: string;
    phone: string;
    emergencyContact: string;
    disabilityType: string;
    supportLevel: string;
    education: string;
    medicalInfo: string;
  };
  currentSituation: {
    livingSituation: string;
    physicalCondition: string;
    mentalCondition: string;
    socialParticipation: string;
    familySituation: string;
  };
  goals: {
    shortTerm: string;
    longTerm: string;
    achievementIndicators: string;
  };
  services: {
    serviceType: string[];
    frequencyMap: { [service: string]: string };
    durationMap: { [service: string]: string };
    provider: string;
    startDate: string;
  };
  supportSystem: {
    supportCoordinator: string;
    serviceProviders: string;
    relatedInstitutions: string;
    informalSupport: string;
  };
  monitoring: {
    frequency: string;
    evaluationMethod: string;
    reviewDate: string;
    emergencyResponse: string;
  };
  summary: string;
  lifeHistory: string;
}

const PlanEditor: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState<PlanData>({
    createdAt: '',
    creator: '',
    supportCoordinatorName: '',
    contact: '',
    basicInfo: {
      name: '田中太郎',
      birthDate: '1985-03-15',
      gender: '男性',
      address: '東京都渋谷区○○町1-2-3',
      phone: '03-1234-5678',
      emergencyContact: '田中花子（母） 090-1234-5678',
      disabilityType: '身体障害',
      supportLevel: '区分2',
      education: '高卒',
      medicalInfo: '',
    },
    currentSituation: {
      livingSituation: '一人暮らし（アパート）',
      physicalCondition: '車椅子を使用、上肢に軽度の麻痺あり',
      mentalCondition: '安定している',
      socialParticipation: '地域のボランティア活動に参加',
      familySituation: '両親は健在、定期的に連絡',
    },
    goals: {
      shortTerm: '6ヶ月以内に自立した生活を送る',
      longTerm: '1年後に就労を目指す',
      achievementIndicators: '日常生活動作の自立度向上',
    },
    services: {
      serviceType: ['居宅介護'],
      frequencyMap: { '居宅介護': '2回' },
      durationMap: { '居宅介護': '2時間/回' },
      provider: '○○介護サービス',
      startDate: '2024-02-01',
    },
    supportSystem: {
      supportCoordinator: '山田相談員',
      serviceProviders: '○○介護サービス、△△医療センター',
      relatedInstitutions: '区役所福祉課、地域包括支援センター',
      informalSupport: '近隣住民、ボランティア',
    },
    monitoring: {
      frequency: '月1回',
      evaluationMethod: '面談、アンケート',
      reviewDate: '2024-07-01',
      emergencyResponse: '24時間対応可能',
    },
    summary: '',
    lifeHistory: '',
  });

  // 初期表示時にlocalStorageから復元
  useEffect(() => {
    if (planId && planId !== 'new') {
      const saved = localStorage.getItem(`planData_${planId}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        // frequencyMapがなければ空オブジェクトで補完
        if (!parsed.services.frequencyMap) {
          parsed.services.frequencyMap = {};
        }
        // durationMapがなければ空オブジェクトで補完
        if (!parsed.services.durationMap) {
          parsed.services.durationMap = {};
        }
        // 新フィールドがなければ空文字で補完
        if (!('createdAt' in parsed)) parsed.createdAt = '';
        if (!('creator' in parsed)) parsed.creator = '';
        if (!('supportCoordinatorName' in parsed)) parsed.supportCoordinatorName = '';
        if (!('contact' in parsed)) parsed.contact = '';
        setPlanData(parsed);
      }
    }
    // 新規作成時は新しいIDを発行してURL遷移
    if (planId === 'new') {
      const newId = Date.now().toString();
      navigate(`/editor/${newId}`, { replace: true });
    }
  }, [planId, navigate]);

  const handleSave = () => {
    if (!planId) return;
    localStorage.setItem(`planData_${planId}`, JSON.stringify(planData));
    alert('保存しました');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // PDFダウンロード処理
    console.log('Downloading plan as PDF');
  };

  const updatePlanData = (
    section: keyof Pick<PlanData, 'basicInfo' | 'currentSituation' | 'goals' | 'services' | 'supportSystem' | 'monitoring'> | 'summary' | 'lifeHistory' | '',
    field: string,
    value: string
  ) => {
    if (section === 'summary' || section === 'lifeHistory') {
      setPlanData((prev) => ({ ...prev, [section]: value }));
    } else if (section === '') {
      setPlanData((prev) => ({ ...prev, [field]: value }));
    } else {
      setPlanData((prev) => ({
        ...prev,
        [section]: {
          ...((prev[section] as object) || {}),
          [field]: value,
        },
      }));
    }
  };

  // 利用サービス種別の選択肢
  const serviceOptions = [
    '居宅介護',
    '重度訪問介護',
    '同行援護',
    '行動援護',
    '療養介護',
    '生活介護',
    '就労継続支援',
    '就労移行支援',
  ];

  // サービスごとの頻度変更ハンドラ
  const handleServiceFrequencyChange = (service: string, value: string) => {
    setPlanData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        frequencyMap: {
          ...prev.services.frequencyMap,
          [service]: value,
        },
      },
    }));
  };

  // サービスごとの時間変更ハンドラ
  const handleServiceDurationChange = (service: string, value: string) => {
    setPlanData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        durationMap: {
          ...prev.services.durationMap,
          [service]: value,
        },
      },
    }));
  };

  // チェックボックスの変更ハンドラ
  const handleServiceTypeChange = (service: string) => (_e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setPlanData((prev) => {
      const isChecked = prev.services.serviceType.includes(service);
      let newServiceType;
      if (checked && !isChecked) {
        newServiceType = [...prev.services.serviceType, service];
      } else if (!checked && isChecked) {
        newServiceType = prev.services.serviceType.filter((s) => s !== service);
      } else {
        newServiceType = prev.services.serviceType;
      }
      // サービスを外した場合はfrequencyMap/durationMapからも削除
      const newFrequencyMap = { ...prev.services.frequencyMap };
      const newDurationMap = { ...prev.services.durationMap };
      if (!checked) {
        delete newFrequencyMap[service];
        delete newDurationMap[service];
      }
      return {
        ...prev,
        services: {
          ...prev.services,
          serviceType: newServiceType,
          frequencyMap: newFrequencyMap,
          durationMap: newDurationMap,
        },
      };
    });
  };

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', p: 3 }}>
      <Paper sx={{ p: 4, border: '1px solid #888', minHeight: '1100px' }}>
        {/* ヘッダー（タイトル＋操作ボタン） */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">障害者支援利用計画 基本情報シート</Typography>
          <Box>
            <Button startIcon={<SaveIcon />} variant="contained" onClick={handleSave} sx={{ mr: 1 }}>保存</Button>
            <Button startIcon={<PrintIcon />} onClick={handlePrint} sx={{ mr: 1 }}>印刷</Button>
            <Button startIcon={<DownloadIcon />} onClick={handleDownload}>PDF出力</Button>
          </Box>
        </Box>
        {/* 作成日・相談支援事業者名・作成者・連絡先 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}><TextField fullWidth label="作成日" type="date" InputLabelProps={{ shrink: true }} value={planData.createdAt || ''} onChange={e => updatePlanData('', 'createdAt', e.target.value)} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="相談支援事業者名" value={planData.supportCoordinatorName || ''} onChange={e => updatePlanData('', 'supportCoordinatorName', e.target.value)} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="作成者" value={planData.creator || ''} onChange={e => updatePlanData('', 'creator', e.target.value)} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="連絡先" value={planData.contact || ''} onChange={e => updatePlanData('', 'contact', e.target.value)} /></Grid>
          </Grid>
        </Box>
        {/* 概要（支援経過・課題のみ） */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>1. 概要（支援経過・課題のみ）</Typography>
          <TextField fullWidth label="支援経過・課題" multiline rows={5} value={planData.summary} onChange={e => updatePlanData('summary', '', e.target.value)} />
        </Box>
        {/* 基本情報 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>基本情報</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}><TextField fullWidth label="氏名" value={planData.basicInfo.name} onChange={e => updatePlanData('basicInfo', 'name', e.target.value)} /></Grid>
            <Grid item xs={6}><TextField fullWidth label="生年月日" type="date" value={planData.basicInfo.birthDate} onChange={e => updatePlanData('basicInfo', 'birthDate', e.target.value)} InputLabelProps={{ shrink: true }} /></Grid>
            <Grid item xs={6}><FormControl fullWidth><InputLabel>性別</InputLabel><Select value={planData.basicInfo.gender} onChange={e => updatePlanData('basicInfo', 'gender', e.target.value)} label="性別"><MenuItem value="男性">男性</MenuItem><MenuItem value="女性">女性</MenuItem><MenuItem value="その他">その他</MenuItem></Select></FormControl></Grid>
            <Grid item xs={6}><TextField fullWidth label="電話番号" value={planData.basicInfo.phone} onChange={e => updatePlanData('basicInfo', 'phone', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="住所" value={planData.basicInfo.address} onChange={e => updatePlanData('basicInfo', 'address', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField fullWidth label="緊急連絡先" value={planData.basicInfo.emergencyContact} onChange={e => updatePlanData('basicInfo', 'emergencyContact', e.target.value)} /></Grid>
            <Grid item xs={6}><FormControl fullWidth><InputLabel>障害種別</InputLabel><Select value={planData.basicInfo.disabilityType} onChange={e => updatePlanData('basicInfo', 'disabilityType', e.target.value)} label="障害種別"><MenuItem value="身体障害">身体障害</MenuItem><MenuItem value="知的障害">知的障害</MenuItem><MenuItem value="精神障害">精神障害</MenuItem><MenuItem value="発達障害">発達障害</MenuItem><MenuItem value="その他">その他</MenuItem></Select></FormControl></Grid>
            <Grid item xs={6}><FormControl fullWidth><InputLabel>支援区分</InputLabel><Select value={planData.basicInfo.supportLevel} onChange={e => updatePlanData('basicInfo', 'supportLevel', e.target.value)} label="支援区分"><MenuItem value="区分1">区分1</MenuItem><MenuItem value="区分2">区分2</MenuItem><MenuItem value="区分3">区分3</MenuItem><MenuItem value="区分4">区分4</MenuItem><MenuItem value="区分5">区分5</MenuItem><MenuItem value="区分6">区分6</MenuItem></Select></FormControl></Grid>
            <Grid item xs={6}><FormControl fullWidth><InputLabel>最終学歴</InputLabel><Select value={planData.basicInfo.education} onChange={e => updatePlanData('basicInfo', 'education', e.target.value)} label="最終学歴"><MenuItem value="高卒">高卒</MenuItem><MenuItem value="大卒">大卒</MenuItem><MenuItem value="特別支援卒">特別支援卒</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="医療の状況"
                multiline
                rows={2}
                value={planData.basicInfo.medicalInfo}
                onChange={e => updatePlanData('basicInfo', 'medicalInfo', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
        {/* 生活歴 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>生活歴</Typography>
          <TextField fullWidth label="生活歴" multiline rows={4} value={planData.lifeHistory} onChange={e => updatePlanData('lifeHistory', '', e.target.value)} />
        </Box>
        {/* 家族構成・支援体制 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>家族構成・支援体制</Typography>
          <TextField fullWidth label="家族構成・支援体制（図や表で記入）" multiline rows={2} value={planData.currentSituation.familySituation} onChange={e => updatePlanData('currentSituation', 'familySituation', e.target.value)} sx={{ mb: 1 }} />
        </Box>
        {/* 現状・課題・強み */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>現状・課題・強み</Typography>
          <TextField fullWidth label="現在の暮らし・生活状況" multiline rows={2} value={planData.currentSituation.livingSituation} onChange={e => updatePlanData('currentSituation', 'livingSituation', e.target.value)} sx={{ mb: 1 }} />
          <TextField fullWidth label="強み・得意なこと" multiline rows={2} value={planData.goals.achievementIndicators} onChange={e => updatePlanData('goals', 'achievementIndicators', e.target.value)} sx={{ mb: 1 }} />
          <TextField fullWidth label="課題や困りごと" multiline rows={2} value={planData.currentSituation.physicalCondition} onChange={e => updatePlanData('currentSituation', 'physicalCondition', e.target.value)} sx={{ mb: 1 }} />
        </Box>
        {/* 本人・家族の意向 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>本人・家族の意向・希望</Typography>
          <TextField fullWidth label="本人の意向・希望" multiline rows={2} value={planData.goals.shortTerm} onChange={e => updatePlanData('goals', 'shortTerm', e.target.value)} sx={{ mb: 1 }} />
          <TextField fullWidth label="家族の意向・希望" multiline rows={2} value={planData.goals.longTerm} onChange={e => updatePlanData('goals', 'longTerm', e.target.value)} sx={{ mb: 1 }} />
        </Box>
        {/* 利用サービス・サービス内容 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>利用サービス・サービス内容</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl component="fieldset" fullWidth>
                <Typography sx={{ mb: 1 }}>利用サービス種別（複数選択可）</Typography>
                <Box>
                  {serviceOptions.map((service) => (
                    <Box key={service} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={planData.services.serviceType.includes(service)}
                            onChange={handleServiceTypeChange(service)}
                          />
                        }
                        label={service}
                      />
                      <TextField
                        size="small"
                        label="頻度"
                        value={(planData.services.frequencyMap || {})[service] || ''}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^0-9]/g, '');
                          if (val) val = val.replace(/^0+/, '');
                          handleServiceFrequencyChange(service, val);
                        }}
                        sx={{ width: 60, ml: 1 }}
                        disabled={!planData.services.serviceType.includes(service)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                      <TextField
                        size="small"
                        label="時間"
                        value={(planData.services.durationMap || {})[service] || ''}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^0-9]/g, '');
                          if (val) val = val.replace(/^0+/, '');
                          handleServiceDurationChange(service, val);
                        }}
                        sx={{ width: 90, ml: 1 }}
                        disabled={!planData.services.serviceType.includes(service)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      />
                    </Box>
                  ))}
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="提供事業者" value={planData.services.provider} onChange={e => updatePlanData('services', 'provider', e.target.value)} />
              <TextField fullWidth label="利用開始予定日" type="date" value={planData.services.startDate} onChange={e => updatePlanData('services', 'startDate', e.target.value)} InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
            </Grid>
          </Grid>
        </Box>
        {/* 支援上の注意点・配慮事項 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>支援上の注意点・配慮事項</Typography>
          <TextField fullWidth label="支援上の注意点・配慮事項" multiline rows={3} value={planData.monitoring.evaluationMethod} onChange={e => updatePlanData('monitoring', 'evaluationMethod', e.target.value)} />
        </Box>
      </Paper>
    </Box>
  );
};

export default PlanEditor; 