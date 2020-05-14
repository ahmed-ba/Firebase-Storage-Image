import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth.service";
import { NavController } from "@ionic/angular";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
export interface Image {
  id: string;
  image: string;
}
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})

export class DashboardPage implements OnInit {
  userEmail: string;
  url: any;
  newImage: Image = {
    id: this.afs.createId(),
    image: "",
  };
  loading: boolean = false;
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.authService.userDetails().subscribe(
      (res) => {
        console.log("res", res);
        if (res !== null) {
          this.userEmail = res.email;
        } else {
          this.navCtrl.navigateBack("");
        }
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  logout() {
    this.authService
      .logoutUser()
      .then((res) => {
        console.log(res);
        this.navCtrl.navigateBack("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  uploadImage(event) {
    this.loading = true;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      (reader.onload = (e: any) => {
        this.url = e.target.result;

        
        const fileraw = event.target.files[0];
        console.log(fileraw);
        const filePath =
          "/Image/" +
          this.newImage.id +
          "/" +
          "Image" +
          (Math.floor(1000 + Math.random() * 9000) + 1);
        const result = this.SaveImageRef(filePath, fileraw);
        const ref = result.ref;
        result.task.then((a) => {
          ref.getDownloadURL().subscribe((a) => {
            console.log(a);

            this.newImage.image = a;
            this.loading = false;
          });

          this.afs.collection("Image").doc(this.newImage.id).set(this.newImage);
        });
      }),
        (error) => {
          alert("Error");
        };
    }
  }

  SaveImageRef(filePath, file) {
    return {
      task: this.storage.upload(filePath, file),
      ref: this.storage.ref(filePath),
    };
  }
}
