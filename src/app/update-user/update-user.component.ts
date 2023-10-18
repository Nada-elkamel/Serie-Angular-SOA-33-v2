import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SerieService } from '../services/serie.service';
import { Role } from '../model/role.model';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{

  currentUser = new User();
  roles! : Array<Role>;
  updatedRoleId! : number;
  
  constructor(private activatedRoute: ActivatedRoute,
              private router :Router,
              private serieService: SerieService) { }

  ngOnInit(): void {
    this.serieService.listeRoles().
    subscribe((roles: any) => {
    console.log(roles);
    this.roles=roles;
    });


    this.serieService.consulterUser(this.activatedRoute.snapshot.params['id']).
    subscribe( user =>{ this.currentUser = user; 
      this.updatedRoleId =   this.currentUser.role.role_id;
      
      console.log('Navigating to updateUser with ID:', this.currentUser.user_id);

    
    } ) ;
    }
    

  

  updateUser() {
    this.currentUser.role = this.roles.find(role => role.role_id == this.updatedRoleId)!;
         this.serieService.updateUser(this.currentUser).subscribe(user => {
      this.router.navigate(['users']);
      
     }
      );
  }
}
