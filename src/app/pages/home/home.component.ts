import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { News } from './models/news';
import { HomeService } from './services/home.service';
import { firstValueFrom } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  closeModal: string = "";
  formLabel: string = "";
  btnLabel: string = "";
  localUrl: any;
  file?: File;
  selectedFile?: File;


  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private uploadService: UploadService,
    private homeService: HomeService) { }

  public newsList: News[] = new Array<News>();
  public news: News = new News();
  public Editor = ClassicEditor;



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
      this.localUrl = this.news.img;
      console.log(this.news);
    });
  }

  selectFile(event: any) {
    this.file = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  deleteNews(id: any) {
    this.alertService.question("", "Deseja realmente deletar este registro?", "OK").then(data => {

      if (data.isConfirmed) {
        this.homeService.deleteNews(id).subscribe(data => {
          this.getNews();
          this.alertService.success("", "Registro deletado com sucesso!", "OK");
        });
      }

    });
  }

  addNews(content: any) {
    this.news = new News();
    this.formLabel = "Adicionar notícia";
    this.btnLabel = "Salvar";
    this.localUrl = "";

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  editNews(content: any, id: any) {

    this.formLabel = "Editar notícia";
    this.btnLabel = "Atualizar";

    this.getNewsById(id);

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }



  async sendForm() {


    this.localUrl = "";

    if (this.file != undefined) {
      let upload = this.uploadService.uploadFile(this.file);
      let result = await firstValueFrom(upload);
      this.news.img = result.urlImagem;
    }


    if (this.news.id != undefined) {

      this.homeService.updateNews(this.news).subscribe(data => {
        this.modalService.dismissAll();
        this.getNews();
        this.news = new News();

        this.alertService.success('', 'Notícia atualizada com sucesso!', 'Ok')
      });
    } else {
      this.homeService.createNews(this.news).subscribe(data => {
        this.modalService.dismissAll();
        this.getNews();
        this.news = new News();
        this.alertService.success('', 'Notícia criada com sucesso!', 'Ok')
      });
    }




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
