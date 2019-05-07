import {
	ComponentFactoryResolver,
	ComponentRef,
	Directive,
	Input,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ImportModalComponent } from "../../components/import-modal/import-modal.component";

@Directive({
  selector: '[importLauncher]'
})
export class ImportLauncherDirective implements OnInit{

	constructor(
		public viewContainerRef: ViewContainerRef,
		private route: ActivatedRoute,
		private componentFactoryResolver: ComponentFactoryResolver,
	) {}

	modalComponent: ComponentRef<ImportModalComponent>;
	@Input()

	ngOnInit() {
		if (localStorage.getItem('signupSource') === 'mozilla') this.insert();
	}

	insert = () => {
		// localStorage.removeItem('signupSource');
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ImportModalComponent);
		const viewContainerRef = this.viewContainerRef;
		viewContainerRef.clear();
		this.modalComponent = viewContainerRef.createComponent(componentFactory);
		window.setTimeout(() => this.launch(),0);
	};

	launch = () => {
		this.modalComponent.instance.openDialog();
	};

}