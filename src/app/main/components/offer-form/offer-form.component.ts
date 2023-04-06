import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Offer} from "../../../models/offer";
import {OffersService} from "../../../services/offers.service";
import {DatePipe} from "@angular/common";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
  providers: [DatePipe]
})
export class OfferFormComponent implements OnInit {


  edit = false;
  offerForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    worthPoints: [0, Validators.required],
    image: [Validators.required]

  });


  id = '';
  title = ''
  image: any = '';
  description = ''
  startDate = ''
  endDate = ''
  worthPoints = 0
  fileName: string = '';

  offerObj: Offer = {
    id: '',
    title: '',
    description: '',
    image: '',
    startDate: '',
    endDate: '',
    worthPoints: 0,
    numOfRedeem: 0,
  }
  today = new Date();


  constructor(
    private fb: FormBuilder,
    private offersService: OffersService,
    private dialogRef: MatDialogRef<OfferFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {

    this.edit = this.data != null;
    if (this.edit) {
      this.id = this.data.id;
      this.title = this.data.title;
      this.image = this.data.image;
      this.description = this.data.description;
      this.startDate = this.data.startDate;
      this.endDate = this.data.endDate;
      this.worthPoints = this.data.worthPoints;
    }

    console.info('Today Date ' + this.fileName)

  }


  resetAll() {
    this.id = '';
    this.title = '';
    this.description = '';
    this.startDate = '';
    this.endDate = '';
    this.worthPoints = 0;
  }

  onSubmit() {

    this.offerObj.id = this.id;
    this.offerObj.title = this.offerForm.controls.title.value!.toString();
    this.offerObj.description = this.offerForm.controls.description.value!.toString();
    this.offerObj.startDate = this.offerForm.controls.startDate.value!.toString();
    this.offerObj.endDate = this.offerForm.controls.endDate.value!.toString();
    this.offerObj.worthPoints = this.offerForm.controls.worthPoints.value!;


    this.offersService.addOffer(this.offerObj, this.image).then(r => {
      this.openSnackBar('Added !')
      console.log(r)
    }).catch(err => {
      this.openSnackBar('Something Went Wrong !');
      console.error(err)
    });
    this.resetAll();
    this.dialogRef.close()
  }


  onSave() {
    this.offersService.updateOffer(this.id, {
      title: this.title,
      description: this.description,
      image: this.image,
      startDate: this.startDate,
      endDate: this.endDate,
      worthPoints: this.worthPoints
    }).then(r => {
      this.openSnackBar('Changes Saved !')
      console.log(r)
    })
    this.dialogRef.close()

  }


  onChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
      this.image = fileList[0];
      this.fileName = fileList[0].name;
    }
  }


  getTitleErrorMessage(): string {
    const titleControl = this.offerForm.controls.title;

    if (titleControl.touched) {
      if (titleControl.hasError('required')) {
        return 'Title is required';
      }
      if (titleControl.hasError('minlength')) {
        return 'Title must be at least 3 characters';
      }
      if (titleControl.hasError('maxlength')) {
        return 'Title must not exceed 50 characters';
      }
    }
    return '';

  }


  getDescriptionErrorMessage(): string {
    const descriptionControl = this.offerForm.controls.description;

    if (descriptionControl.touched) {
      if (descriptionControl.hasError('required')) {
        return 'Title is required';
      }
      if (descriptionControl.hasError('minlength')) {
        return 'Description must be at least 10 characters';
      }
      if (descriptionControl.hasError('maxlength')) {
        return 'Description must not exceed 500 characters';
      }
    }
    return '';
  }

  getDatesErrorMessage(): string {
    const startDateControl = this.offerForm.controls.startDate;
    const endDateControl = this.offerForm.controls.endDate;

    if (startDateControl.touched) {
      if (startDateControl.hasError('required')) {
        return 'Start date is required';
      }
    }
    if (endDateControl.touched) {
      if (startDateControl.hasError('required')) {
        return 'End Date is required';
      }
    }
    return '';
  }


  getPictureErrorMessage() {
    const pictureControl = this.offerForm.controls.image;

    if (pictureControl.touched || pictureControl.dirty) {
      if (pictureControl.hasError('required')) {
        return 'Picture is required';
      }
    }

    return '';
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }

  isFormValid(): boolean {

    return this.offerForm.valid && this.fileName != ''
  }

}
