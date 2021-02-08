import { Perform } from "./Tool.model";

export abstract class Tool {
	protected engaged: boolean = false;
	public name: string;
	public label: string;
	
	constructor(name: string, label: string) {
		this.name = name;
		this.label = label;
	}

	protected engage() { this.engaged = true; }
	protected disengage() { this.engaged = false; }

	public abstract performStart: Perform;
	public abstract performMove: Perform;
	public abstract performEnd: Perform;
}