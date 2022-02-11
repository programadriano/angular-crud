import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { firstValueFrom } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Result } from 'src/app/shared/services/result';
import { News } from '../models/news';
import { VideoService } from './services/video.service';
import { Video } from '../models/video';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  closeModal: string = "";
  formLabel: string = "";
  btnLabel: string = "";
  localUrl: any;
  localVideoUrl: any;
  file?: File;
  videoFile?: File;

  selectedFile?: File;


  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private uploadService: UploadService,
    private videoService: VideoService) { }

  public videoList: Video[] | undefined = new Array<Video>();
  public video: Video = new Video();
  public Editor = ClassicEditor;
  totalPages: number[] = [];
  hasPagination = false;

  ngOnInit(): void {
    this.getVideos(1, 4);
  }


  getVideos(page: number, qtd: number) {
    this.videoService.getVideos(page, qtd).subscribe((result: Result<Video>) => {
      let obj = result;
      this.totalPages = new Array(obj.total);
      this.hasPagination = this.totalPages.length > 1;
      this.videoList = obj.data;
    });
  }

  pagination(page: number) {
    this.getVideos(page, 4);
  }

  getVideoById(id: string) {
    this.videoService.getVideoById(id).subscribe((data: News) => {
      this.video = data;
      this.localUrl = this.video.thumbnail;
      this.localVideoUrl = this.video.urlVideo;
    });
  }


  selectVideo(event: any) {
    this.videoFile = <File>event.target.files[0];
    this.localVideoUrl = this.videoFile.name;
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


  deleteVideo(id: any) {
    this.alertService.question("", "Deseja realmente deletar este registro?", "OK").then(data => {

      if (data.isConfirmed) {
        this.videoService.deleteVideo(id).subscribe(data => {
          this.getVideos(1, 4);
          this.alertService.success("", "Registro deletado com sucesso!", "OK");
        });
      }

    });
  }

  addVideo(content: any) {
    this.video = new Video();
    this.formLabel = "Adicionar vídeo";
    this.btnLabel = "Salvar";
    this.localUrl = "";

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  editVideo(content: any, id: any) {

    this.formLabel = "Editar vídeo";
    this.btnLabel = "Atualizar";

    this.getVideoById(id);

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }



  async sendForm() {


    this.localUrl = "";


    if (this.videoFile != undefined) {
      let upload = this.uploadService.uploadFile(this.videoFile);
      let result = await firstValueFrom(upload);
      console.log(result);
      this.video.urlVideo = result.urlImagem;
    }


    if (this.file != undefined) {
      let upload = this.uploadService.uploadFile(this.file);
      let result = await firstValueFrom(upload);
      this.video.thumbnail = result.urlImagem;
    }


    if (this.video.id != undefined) {

      this.videoService.updateVideo(this.video).subscribe(data => {
        this.modalService.dismissAll();
        this.getVideos(1, 4);
        this.video = new News();

        this.alertService.success('', 'Vídeo atualizado com sucesso!', 'Ok')
      });
    } else {
      this.videoService.createVideo(this.video).subscribe(data => {
        this.modalService.dismissAll();
        this.getVideos(1, 4);
        this.video = new News();
        this.alertService.success('', 'Vídeo criado com sucesso!', 'Ok')
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
