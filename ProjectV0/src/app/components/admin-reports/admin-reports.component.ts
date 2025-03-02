import { Component, OnInit } from '@angular/core';
import { RapportService } from '../../services/rapport.service';
import { Rapport } from '../../models/rapport.model';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css'],
  standalone: true,
  imports: []  
})
export class AdminReportsComponent implements OnInit {
  reports: Rapport[] = [];
  loading = true;

  constructor(private reportService:RapportService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    this.reportService.getAllReports().subscribe((data) => {
      console.log('Reports array after fetch:', data); // Check the fetched data
      this.reports=data;
      this.loading = false;
    });
  }
  

  deleteReport(id: number) {
    if (confirm('Are you sure you want to delete this report?')) {
      this.reportService.deleteReport(id).subscribe(() => {
        this.reports = this.reports.filter(report => report.idRapport !== id);
      });
    }
  }
}
