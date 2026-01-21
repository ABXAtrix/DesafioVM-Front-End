import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VmService } from '../../../services/virtual-machine.service';
import { VirtualMachine } from '../../../core/models/virtual-machine.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private vmService = inject(VmService);

  vms: VirtualMachine[] = [];
  isLoading = true;
  readonly LIMITE_VMS = 5;

  // KPIs
  totalVms = 0;
  vmsAtivas = 0;
  vmsInterrompidas = 0;

  private statusChart?: Chart;
  private capacityChart?: Chart;

  ngOnInit(): void {
    this.carregarDados();
  }

  ngOnDestroy(): void {
    this.destruirGraficos();
  }

  carregarDados(): void {
    this.isLoading = true;
    this.vmService.listar().subscribe({
      next: (res: any) => {
        this.vms = res.dados;
        this.calcularKpis();
        this.isLoading = false;
        setTimeout(() => this.inicializarGraficos(), 50);
      },
      error: (err) => {
        console.error('Erro ao carregar dados do dashboard', err);
        this.isLoading = false;
      }
    });
  }

  calcularKpis(): void {
    this.totalVms = this.vms.length;
    this.vmsAtivas = this.vms.filter(v => v.status === 'START').length;
    this.vmsInterrompidas = this.vms.filter(v => v.status === 'STOP' || v.status === 'SUSPEND').length;
  }

  inicializarGraficos(): void {
    this.destruirGraficos();

    const ctxBar = document.getElementById('statusChart') as HTMLCanvasElement;
    const ctxPie = document.getElementById('capacityChart') as HTMLCanvasElement;

    if (!ctxBar || !ctxPie) return;

    this.statusChart = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ['Ligadas', 'Desligadas', 'Suspensas'],
        datasets: [{
          label: 'Máquinas',
          data: [
            this.vms.filter(v => v.status === 'START').length,
            this.vms.filter(v => v.status === 'STOP').length,
            this.vms.filter(v => v.status === 'SUSPEND').length
          ],
          backgroundColor: ['#4ade80', '#f87171', '#fbbf24'],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }
      }
    });

    this.capacityChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ['Ocupado', 'Disponível'],
        datasets: [{
          data: [this.totalVms, Math.max(0, this.LIMITE_VMS - this.totalVms)],
          backgroundColor: ['#7b78ff', '#f1f5f9'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  destruirGraficos(): void {
    this.statusChart?.destroy();
    this.capacityChart?.destroy();
  }
}