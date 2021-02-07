import { Perform } from "./Tool.model";

export abstract class Tool {
	protected engaged: boolean;
	public name: string;
	public label: string;
	
	constructor(name, label, engaged = false) {
		this.name = name;
		this.label = label;
		this.engaged = engaged;
	}

	protected engage() { this.engaged = true; }
	protected disengage() { this.engaged = false; }

	public abstract performStart?: Perform;
	public abstract performMove?: Perform;
	public abstract performEnd?: Perform;
}