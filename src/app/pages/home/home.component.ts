import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert.service';
import { News } from './models/news';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  closeModal: string = "";

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private homeService: HomeService) { }

  public newsList: News[] = new Array<News>();
  public news: News = new News();

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.homeService.getNews().subscribe((data: Array<News>) => {
      this.newsList = data;
    });
  }

  getNewsById(id: string) {
    this.homeService.getNewsById(id).subscribe((data: News) => {
      this.news = data;
      console.log(this.news);
    });
  }

  deleteNews() {
    this.alertService.question("", "Deseja realmente deletar este registro?", "OK");
  }

  triggerModal(content: any, id: any) {
   this.getNewsById(id);

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
