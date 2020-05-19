import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  

  goToPage(pageName: string): void {
    localStorage.clear();
    confirm('logged out success')
    this.router.navigate([`${pageName}`]);

  }

}

