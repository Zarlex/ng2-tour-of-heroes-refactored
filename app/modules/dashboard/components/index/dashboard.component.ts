import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-dashboard',
    templateUrl: 'dashboard.template.html',
    styleUrls: ['dashboard.style.css']
})
export class DashboardComponent implements OnInit {
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