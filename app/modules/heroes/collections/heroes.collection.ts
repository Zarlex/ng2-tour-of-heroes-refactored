import {Hero} from '../models/hero.model';
import {Injectable} from '@angular/core';
import {BaseCollection} from '../../backbone/collections/backbone.collection';
import {BaseModel} from '../../backbone/models/backbone.model';

@Injectable()
export class Heroes extends BaseCollection<BaseModel> {
    url = 'app/heroes';
    model = Hero;
    queryParams: {
        name: string
    };
}
