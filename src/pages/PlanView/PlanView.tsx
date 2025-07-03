import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Print as PrintIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

interface PlanData {
  id: string;
  clientName: string;
  clientId: string;
  birthDate: string;
  gender: string;
  address: string;
  phone: string;
  emergencyContact: string;
  disabilityType: string;
  supportLevel: string;
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
    frequency: string;
    duration: string;
    provider: string;
    startDate: string;
    frequencyMap?: Record<string, string>;
    durationMap?: Record<string, string>;
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
  status: string;
  createdAt: string;
  updatedAt: string;
  assignedTo: string;
  education: string;
  summary: string;
  lifeHistory: string;
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
  creator?: string;
  supportCoordinatorName?: string;
  contact?: string;
}

const defaultPlanData: PlanData = {
    id: '1',
    clientName: '田中太郎',
    clientId: 'C001',
    birthDate: '1985-03-15',
    gender: '男性',
    address: '東京都渋谷区○○町1-2-3',
    phone: '03-1234-5678',
    emergencyContact: '田中花子（母） 090-1234-5678',
    disabilityType: '身体障害',
    supportLevel: '区分2',
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
      frequency: '週3回',
      duration: '2時間/回',
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
    status: '承認済み',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    assignedTo: '山田相談員',
    education: '高卒',
    summary: '支援経過や課題の例文がここに入ります。',
    lifeHistory: '生活歴の例文がここに入ります。',
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
      medicalInfo: 'かかりつけ医：渋谷クリニック、通院：月1回、服薬：有',
    },
    creator: '山田相談員',
    supportCoordinatorName: '山田相談員',
    contact: '03-1234-5678',
  };

const PlanView: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();

  const [planData, setPlanData] = useState<PlanData | null>(null);

  useEffect(() => {
    if (planId) {
      const saved = localStorage.getItem(`planData_${planId}`);
      if (saved) {
        setPlanData(JSON.parse(saved));
        return;
      }
    }
    setPlanData(defaultPlanData);
  }, [planId]);

  if (!planData) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    console.log('Downloading plan as PDF');
  };

  return (
    <Box sx={{ maxWidth: 900, margin: '0 auto', p: 3 }}>
      <Paper sx={{ p: 4, border: '1px solid #888', minHeight: '1100px' }}>
        {/* ヘッダー（タイトル＋操作ボタン） */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5">障害者支援利用計画 基本情報シート</Typography>
          <Box>
            <Button startIcon={<PrintIcon />} onClick={handlePrint} sx={{ mr: 1 }}>印刷</Button>
            <Button startIcon={<DownloadIcon />} onClick={handleDownload}>PDF出力</Button>
          </Box>
        </Box>
        {/* 作成日・相談支援事業者名・作成者・連絡先 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}><Typography>作成日: {planData.createdAt}</Typography></Grid>
            <Grid item xs={6}><Typography>相談支援事業者名: {planData.supportCoordinatorName}</Typography></Grid>
            <Grid item xs={6}><Typography>作成者: {planData.creator}</Typography></Grid>
            <Grid item xs={6}><Typography>連絡先: {planData.contact}</Typography></Grid>
          </Grid>
        </Box>
        {/* 概要（支援経過・課題のみ） */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>1. 概要（支援経過・課題のみ）</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{planData.summary}</Typography>
        </Box>
        {/* 基本情報 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>基本情報</Typography>
          <Typography>作成者: {planData.creator || ''}</Typography>
          <Typography>相談支援事業者名: {planData.supportCoordinatorName || ''}</Typography>
          <Typography>連絡先: {planData.contact || ''}</Typography>
        </Box>
        {/* 基本情報 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>基本情報</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}><Typography>氏名: {planData.basicInfo.name}</Typography></Grid>
            <Grid item xs={6}><Typography>生年月日: {planData.basicInfo.birthDate}</Typography></Grid>
            <Grid item xs={6}><Typography>性別: {planData.basicInfo.gender}</Typography></Grid>
            <Grid item xs={6}><Typography>電話番号: {planData.basicInfo.phone}</Typography></Grid>
            <Grid item xs={12}><Typography>住所: {planData.basicInfo.address}</Typography></Grid>
            <Grid item xs={12}><Typography>緊急連絡先: {planData.basicInfo.emergencyContact}</Typography></Grid>
            <Grid item xs={6}><Typography>障害種別: {planData.basicInfo.disabilityType}</Typography></Grid>
            <Grid item xs={6}><Typography>支援区分: {planData.basicInfo.supportLevel}</Typography></Grid>
            <Grid item xs={6}><Typography>最終学歴: {planData.basicInfo.education}</Typography></Grid>
            <Grid item xs={12}><Typography>医療の状況: {planData.basicInfo.medicalInfo}</Typography></Grid>
          </Grid>
        </Box>
        {/* 生活歴 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>生活歴</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{planData.lifeHistory}</Typography>
        </Box>
        {/* 家族構成・支援体制 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>家族構成・支援体制</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{planData.currentSituation.familySituation}</Typography>
        </Box>
        {/* 現状・課題・強み */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>現状・課題・強み</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>現在の暮らし・生活状況: {planData.currentSituation.livingSituation}</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>強み・得意なこと: {planData.goals.achievementIndicators}</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>課題や困りごと: {planData.currentSituation.physicalCondition}</Typography>
        </Box>
        {/* 本人・家族の意向 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>本人・家族の意向・希望</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>本人の意向・希望: {planData.goals.shortTerm}</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>家族の意向・希望: {planData.goals.longTerm}</Typography>
        </Box>
        {/* 利用サービス・サービス内容 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>利用サービス・サービス内容</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            利用サービス種別: {
              Array.isArray(planData.services.serviceType)
                ? planData.services.serviceType.map(service => {
                    let freq = planData.services.frequencyMap ? planData.services.frequencyMap[service] : '';
                    let duration = planData.services.durationMap ? planData.services.durationMap[service] : '';
                    freq = freq ? freq.replace(/[^0-9]/g, '') : '';
                    duration = duration ? duration.replace(/[^0-9]/g, '') : '';
                    const freqText = freq ? `週${freq}` : '';
                    const durationText = duration ? `${duration}時間` : '';
                    return [service, freqText, durationText].filter(Boolean).join(' ');
                  }).join('、')
                : planData.services.serviceType
            }
          </Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>提供事業者: {planData.services.provider}</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>利用開始予定日: {planData.services.startDate}</Typography>
        </Box>
        {/* 支援上の注意点・配慮事項 */}
        <Box sx={{ border: '1px solid #bbb', p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>支援上の注意点・配慮事項</Typography>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{planData.monitoring.evaluationMethod}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default PlanView; 