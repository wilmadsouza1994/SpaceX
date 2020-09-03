import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 
  value: any[];
  val: string;
  parValue: any;
  image: any;
  textvalue: string = 'Launch Year';
  successvalue:string='Successful Launch'
  launch:"launch_landing"
  filterValue: any[];
  filtered: string;
  filterData: any[];
  launchYear: any;
  newArr: any[];
  successArr: any[]; 
  loadValue: any; 
  success: number;
  newvalue: any;
  landArr: any[];
  landData: any[];
  landfiltered: string;
  landValue: any;
  yearvalue: any;
  laun: any;
 
  appName: any;
 public titleName;
 
  constructor(private httpClient:HttpClient,private activatedRoute: ActivatedRoute,private router:Router) { }

  ngOnInit(): void { 
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.appName = params['launch_year'];
      this.titleName = this.appName;   
   
    });   
    this.getYear();
    
  }

  getYear()
  {
    let myurl='https://api.spaceXdata.com/v3/launches?limit=100';  
    this.httpClient.get(myurl)
    .subscribe(
      (data:any[]) => 
      {
        if(data.length)
        {         
        this.value=data;
        this.val=   JSON.stringify(this.value)
        this.parValue=JSON.parse(this.val)
        this.newArr = []       
          for(var i=0;i<this.parValue.length;i++){                 
            this.parValue.forEach((item, i) => {
              if (this.newArr.findIndex(i => i.launch_year == item.launch_year) === -1) 
              {
                this.newArr.push(item)            
             
              }                      
           });          
          this.parValue = this.newArr                
          this.image=this.parValue[i].links.mission_patch_small  
                  
          }    
                  
        }
      })
  }
  getFilter()
  {
    let myurl='https://api.spaceXdata.com/v3/launches?limit=100&launch_success';  
    this.httpClient.get(myurl)
    .subscribe(
      (data:any[]) => 
      {
        if(data.length)
        {         
        this.filterData=data;
        this.filtered=   JSON.stringify(this.filterData)
        this.filterValue=JSON.parse(this.filtered)     
        this.successArr=[]
        this.landArr=[]
          for(var i=0;i<this.filterValue.length;i++){  
            this.laun=this.filterValue[i].launch_success  
            console.log(this.laun)       
            this.filterValue.forEach((item, i) => {
                       
              if (this.successArr.findIndex(i => i.launch_success == item.launch_success) === -1){ 
               this.successArr.push(item)
                     
              }           
                              
           });
          this.filterValue = this.successArr
         
          }      
          
        }
      })
  }

  getLand()
  {
    let myurl='https://api.spaceXdata.com/v3/launches?limit=100&land_success';  
    this.httpClient.get(myurl)
    .subscribe(
      (data:any[]) => 
      {
        if(data.length)
        {         
        this.landData=data;
        this.landfiltered=   JSON.stringify(this.landData)
        this.landValue=JSON.parse(this.landfiltered) 
       
        this.landArr=[]
          for(var i=0;i<this.landValue.length;i++){           
            this.landValue.forEach((item, i) => {                     
             
                if (this.landArr.findIndex(i => i.rocket.first_stage.cores[0].land_success == item.rocket.first_stage.cores[0].land_success) === -1){ 
                this.success=  this.landArr.push(item)
                console.log(this.success)              
              }              
                    
           });
          this.landValue = this.landArr
          console.log(this.landValue)  
          }      
          
        }
      })
  }
  
  applyFilter(year,i) { 
    
    this.router.navigate(['/launches',year.launch_year],{
      queryParams:{
        'launch_year':year.launch_year,'launch_success':year.launch_success,'land_success':year.rocket.first_stage.cores[0].land_success
      }          

    }) 
    this.getFilter();
    this.getLand(); 
  
   
  
    
	}  

}
