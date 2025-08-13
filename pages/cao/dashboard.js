import React, { useMemo } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Hourglass,
  ArrowUpRight
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

export default function CAODashboard() {
  // ------------------------------
  // Mock Data
  // ------------------------------
  const kpis = {
    totalApplications: 1245,
    disbursed: 982,
    rejected: 75,
    pending: 188
  };

  const monthlyFundData = [
    { month: 'Apr', ndmc: 4200000, state: 4000000 },
    { month: 'May', ndmc: 5000000, state: 4600000 },
    { month: 'Jun', ndmc: 5200000, state: 5200000 },
    { month: 'Jul', ndmc: 5800000, state: 6000000 },
    { month: 'Aug', ndmc: 6100000, state: 6100000 },
    { month: 'Sep', ndmc: 5600000, state: 5800000 },
    { month: 'Oct', ndmc: 6400000, state: 6600000 },
    { month: 'Nov', ndmc: 6200000, state: 6400000 },
    { month: 'Dec', ndmc: 6800000, state: 6700000 },
    { month: 'Jan', ndmc: 7000000, state: 7000000 },
    { month: 'Feb', ndmc: 6900000, state: 6900000 },
    { month: 'Mar', ndmc: 7200000, state: 7300000 }
  ];

  // ------------------------------
  // Chart Data
  // ------------------------------
  const disbursementChartData = useMemo(() => {
    const labels = monthlyFundData.map((m) => m.month);
    const ndmcData = monthlyFundData.map((m) => Math.round(m.ndmc / 100000));
    const stateData = monthlyFundData.map((m) => Math.round(m.state / 100000));

    // Using total fund as monthly disbursement for mock; replace with real series when available
    const disbursedData = monthlyFundData.map((m) =>
      Math.round((m.ndmc + m.state) / 100000)
    );

    return {
      labels,
      datasets: [
        {
          label: 'NDMC Fund (₹ Lakh)',
          data: ndmcData,
          backgroundColor: 'rgba(14, 116, 248, 0.8)',
          borderRadius: 6,
          barThickness: 24
        },
        {
          label: 'State Fund (₹ Lakh)',
          data: stateData,
          backgroundColor: 'rgba(255, 153, 51, 0.8)',
          borderRadius: 6,
          barThickness: 24
        },
        {
          type: 'line',
          label: 'Disbursed (₹ Lakh)',
          data: disbursedData,
          borderColor: 'rgba(99, 102, 241, 1)',
          backgroundColor: 'rgba(99, 102, 241, 0.25)',
          pointBackgroundColor: 'rgba(99, 102, 241, 1)',
          pointBorderColor: 'rgba(99, 102, 241, 1)',
          pointRadius: 3,
          tension: 0.3,
          borderWidth: 2,
          yAxisID: 'y'
        }
      ]
    };
  }, [monthlyFundData]);

  const disbursementChartOptions = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (ctx) => `₹${(ctx.raw * 100000).toLocaleString()}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v) => `${v} L` },
        grid: { color: 'rgba(15,23,42,0.06)' }
      },
      x: { grid: { display: false } }
    }
  };

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <DashboardLayout role="CAO">
      {/* KPI Cards */}
      <div className="row g-4 g-xl-5 mb-4 ">
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm rounded-4 border-0 py-4 px-3 d-flex flex-row gap-3 align-items-center justify-content-between ">
            <div className="d-flex align-items-center gap-3">
              <span className="icon-circle-wrap bg-primary text-white shrink-0">
                <FileText size={20} />
              </span>
              <span>
                <h6 className="mb-2 small">Total Sanctioned</h6>
                <p className="fw-semibold mb-0">{kpis.totalApplications}</p>
              </span>
            </div>
            <span className="arrow-wrap">
              <Link href="">
                <ArrowUpRight />
              </Link>
            </span>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm rounded-4 border-0 py-4 px-3 d-flex flex-row gap-3 align-items-center justify-content-between ">
            <div className="d-flex align-items-center gap-3">
              <span className="icon-circle-wrap bg-success text-white shrink-0">
                <CheckCircle2 size={20} />
              </span>
              <span>
                <h6 className="mb-2 small">Total Disbursed</h6>
                <p className="fw-semibold mb-0">{kpis.disbursed}</p>
              </span>
            </div>
            <span className="arrow-wrap">
              <Link href="">
                <ArrowUpRight />
              </Link>
            </span>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm rounded-4 border-0 py-4 px-3 d-flex flex-row gap-3 align-items-center justify-content-between ">
            <div className="d-flex align-items-center gap-3">
              <span className="icon-circle-wrap bg-warning text-white shrink-0">
                <Hourglass size={20} />
              </span>
              <span>
                <h6 className="mb-2 small">Pending</h6>
                <p className="fw-semibold mb-0">{kpis.pending}</p>
              </span>
            </div>
            <span className="arrow-wrap">
              <Link href="">
                <ArrowUpRight />
              </Link>
            </span>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm rounded-4 border-0 py-4 px-3 d-flex flex-row gap-3 align-items-center justify-content-between ">
            <div className="d-flex align-items-center gap-3">
              <span className="icon-circle-wrap bg-danger text-white shrink-0">
                <XCircle size={20} />
              </span>
              <span>
                <h6 className="mb-2 small">Rejected By Bank</h6>
                <p className="fw-semibold mb-0">{kpis.rejected}</p>
              </span>
            </div>
            <span className="arrow-wrap">
              <Link href="">
                <ArrowUpRight />
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Monthly Disbursement Trend */}
      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="card rounded-4 border-0 shadow-sm p-4 mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">Monthly Disbursement Trend</h5>
              <small className="text-muted">FY 2025–26</small>
            </div>
            <div style={{ width: '100%', maxHeight: '400px' }}>
              <Bar data={disbursementChartData} options={disbursementChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}