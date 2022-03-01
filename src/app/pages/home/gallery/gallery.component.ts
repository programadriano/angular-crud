import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { firstValueFrom } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Result } from 'src/app/shared/services/result';
import { HomeService } from '../services/home.service';
import { Gallery } from '../models/gallery';
import { GalleryService } from './services/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

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
    private homeService: GalleryService) { }

  public galleryList: Gallery[] | undefined = new Array<Gallery>();
  public gallery: Gallery = new Gallery();
  public Editor = ClassicEditor;
  totalPages: number[] = [];
  hasPagination = false;
  selectedFiles?: Array<FileList>;



  ngOnInit(): void {
    this.gallery.galleryImages = [];
    this.getGallery(1, 4);
  }


  getGallery(page: number, qtd: number) {
    this.homeService.getGallery(page, qtd).subscribe((result: Result<Gallery>) => {
      let obj = result;
      this.totalPages = new Array(obj.totalPages);
      console.log(this.totalPages)
      this.hasPagination = this.totalPages.length > 1;

      this.galleryList = obj.data;
    });
  }

  pagination(page: number) {
    this.getGallery(page, 4);
  }

  getGalleryById(id: string) {
    this.homeService.getGalleryById(id).subscribe((data: Gallery) => {
      this.gallery = data;
    });
  }

  selectFile(event: any) {

    this.selectedFiles = [];
    if (event.target.files.length === 0) {
      return;
    }

    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFiles.push(event.target.files[i]);
    }
  }

  selectThumb(event: any) {
    this.file = <File>event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  removeImageGallery(urlImage: any) {
    this.gallery.galleryImages = this.gallery.galleryImages?.filter(item => item !== urlImage);

  }

  deleteGallery(id: any) {
    this.alertService.question("", "Deseja realmente deletar este registro?", "OK").then(data => {

      if (data.isConfirmed) {
        this.homeService.deleteGallery(id).subscribe(data => {
          this.getGallery(1, 4);
          this.alertService.success("", "Registro deletado com sucesso!", "OK");
        });
      }

    });
  }

  addGallery(content: any) {
    this.gallery = new Gallery();
    this.formLabel = "Adicionar galeria";
    this.btnLabel = "Salvar";
    this.localUrl = "";

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  editGallery(content: any, id: any) {

    this.formLabel = "Editar notícia";
    this.btnLabel = "Atualizar";

    this.getGalleryById(id);

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }



  async sendForm() {
    this.localUrl = "";

    if (this.selectedFiles != undefined && this.selectedFiles.length > 0) {
      this.gallery.galleryImages = [];

      for (let index = 0; index < this.selectedFiles.length; index++) {
        let upload = this.uploadService.uploadFile(this.selectedFiles[index]);
        let result = await firstValueFrom(upload);
        this.gallery.galleryImages.push(result.urlImagem);
        console.log(this.gallery.galleryImages, 'GLAEE')
      }
    }

    if (this.file != undefined) {
      let upload = this.uploadService.uploadFile(this.file);
      let result = await firstValueFrom(upload);
      this.gallery.thumb = result.urlImagem;
    }



    if (this.gallery.id != undefined) {

      this.homeService.updateGallery(this.gallery).subscribe(data => {
        this.modalService.dismissAll();
        this.getGallery(1, 4);
        this.gallery = new Gallery();

        this.alertService.success('', 'Galeria atualizada com sucesso!', 'Ok')
      });
    } else {
      this.homeService.createNews(this.gallery).subscribe(data => {
        this.modalService.dismissAll();
        this.getGallery(1, 4);
        this.gallery = new Gallery();
        this.alertService.success('', 'Galeria criada com sucesso!', 'Ok')
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
