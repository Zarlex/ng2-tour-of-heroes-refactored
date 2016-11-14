import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from '../../../heroes/models/hero.model';
import {HeroService} from '../../../heroes/services/data.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'index.template.html',
    styleUrls: ['index.style.css']
})
export class DashboardIndexComponent implements OnInit {
    constructor(private heroService: HeroService, private router: Router) {
    }

    heroes: Hero[] = [];

    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }

    gotoDetail(hero: Hero): void {
        let link = ['/heroes', hero.id];
        this.router.navigate(link);
    }

}