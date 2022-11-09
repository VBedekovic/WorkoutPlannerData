import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatatableService } from 'src/app/services/datatable.service';
import { Exercise } from 'src/models/exercise';
import { Workout } from 'src/models/workout';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  dataEntries: Workout[] = [];
  isEmpty = false;
  isLoading = false;

  searchValue = ""
  searchField = ""

  constructor(private datatableService: DatatableService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.datatableService.getAllData().subscribe({
      next: (response) => {
        this.dataEntries = response.body ? response.body : [];
        if (this.dataEntries.length == 0) this.isEmpty = true;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(error)
      }
    })
  }

  getSearchData() {
    this.isLoading = true;
    this.datatableService.getSearchData(this.searchField, this.searchValue).subscribe({
      next: (response) => {
        this.dataEntries = response.body ? response.body : [];
        if (this.dataEntries.length == 0) this.isEmpty = true;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        console.log(error)
      }
    })
  }

  getDayOfWeek(day: number): string {
    switch (day) {
      case 1: {
        return "Mon"
      }
      case 2: {
        return "Thu"
      }
      case 3: {
        return "Wen"
      }
      case 4: {
        return "Thr"
      }
      case 5: {
        return "Fri"
      }
      case 6: {
        return "Sat"
      }
      case 7: {
        return "Sun"
      }
      default: {
        return "idk"
      }
    }
  }

  formatList(list: string[]) {
    return list.join(", ")
  }

  formatExec(list: Exercise[]) {
    let st = ""
    for (const [i, exercise] of list.entries()) {
      st += exercise.exercise_name
      if (!(i === list.length - 1)) {
        st += ",\n"
      }
    }
    return st
  }
}
