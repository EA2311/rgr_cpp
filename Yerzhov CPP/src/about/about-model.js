import { EventEmitter } from '../evente-emitter';
import { MethodsAJAX } from '../methodsAJAX';

export class AboutModel extends EventEmitter{
		constructor() {
				super();
				this.methodsAJAX = new MethodsAJAX();
				this.aboutData = [];
		}

		getAboutData() {
				if (!this.aboutData.length > 0) {
						 this.getAboutDataAJAX()
								.then((about) => {

										this.aboutData = about;
										this.emit('getAboutData', about);
								});
				} else {
						this.emit('getAboutData', this.aboutData);
				}
		}

		getAboutDataAJAX() {
				return this.methodsAJAX.getDataFetch('http://localhost:3006/about')
		}
}
