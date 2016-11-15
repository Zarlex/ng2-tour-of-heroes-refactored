import {Injectable} from '@angular/core';
import {BaseModel} from '../../backbone/models/backbone.model';

@Injectable()
export class Hero extends BaseModel {
    urlRoot = 'app/heroes';

    defaults(){
        return {
            name: ''
        };
    }

    validate(attrs: any){
        attrs.name = attrs.name.trim();
        if (!attrs.name) {
            return 'Name is required';
        }
    }
}