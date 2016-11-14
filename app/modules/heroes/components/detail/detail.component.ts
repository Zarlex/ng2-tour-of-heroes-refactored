import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';
import {Location}                 from '@angular/common';

import {Hero} from '../../models/hero.model';
import {HeroService} from '../../services/data.service';

@Component({
    moduleId: module.id,
    selector: 'my-hero-detail',
    templateUrl: 'detail.template.html'
})
export class HeroesDetailComponent implements OnInit {
    @Input()
    hero: Hero;

    constructor(private heroService: HeroService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.heroService.getHero(id)
                .then(hero => this.hero = hero);
        });
    }

    goBack(): void {
        this.location.back();
    }

    save(): void{
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }
}