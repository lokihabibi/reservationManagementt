import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HeroComponent implements OnInit, AfterViewInit {
  searchQuery: string = '';
  showSuggestions: boolean = false;
  timeSlots: { time: string; available: boolean; }[] = [
    { time: '13:00', available: true },
    { time: '14:00', available: false },
    { time: '15:00', available: true },
    { time: '16:00', available: true }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initParticles();
  }

  ngAfterViewInit() {
    this.initAnimations();
  }

  private initParticles() {
    const particles = document.querySelector('.particles') as HTMLElement;
    if (!particles) return;

    // Create dynamic particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      particles.appendChild(particle);
    }
  }

  private initAnimations() {
    // Add glitch effect randomly
    setInterval(() => {
      const glitchLines = document.querySelectorAll('.glitch-line');
      const randomLine = glitchLines[Math.floor(Math.random() * glitchLines.length)];
      randomLine?.classList.add('glitch-active');
      setTimeout(() => {
        randomLine?.classList.remove('glitch-active');
      }, 200);
    }, 3000);

    // Animate stats
    const statsValue = document.querySelector('.stat-value');
    if (statsValue) {
      let count = 0;
      const target = 500;
      const duration = 2000;
      const increment = target / (duration / 16);

      const updateCount = () => {
        count = Math.min(count + increment, target);
        statsValue.textContent = `+${Math.floor(count)}`;
        if (count < target) {
          requestAnimationFrame(updateCount);
        }
      };

      updateCount();
    }
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.showSuggestions = this.searchQuery.length > 0;
  }

  onSuggestionClick(suggestion: string) {
    this.searchQuery = suggestion;
    this.showSuggestions = false;
    // Navigate to search results
    this.router.navigate(['/search'], { queryParams: { q: suggestion } });
  }

  onStartClick() {
    const button = document.querySelector('.btn-primary') as HTMLElement;
    if (!button) return;

    // Add click effect
    button.classList.add('clicked');
    setTimeout(() => {
      button.classList.remove('clicked');
      this.router.navigate(['/search']);
    }, 300);
  }

  onLearnMoreClick() {
    this.router.navigate(['/how-it-works']);
  }
}
