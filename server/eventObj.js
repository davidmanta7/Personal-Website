

class Event {
	var day; //Day of week
	var time; //Time of day
	var building; //Building of event
	var room; //Room of event
	var name; //Name of class
	var duration; //Duration of class
	var category; //Category of class
	constructor(d,t,b,r,n,dur,cat) {
		day = d;
		time = t;
		building = b;
		room = r;
		name = n;
		duration = dur;
		category = cat;
	}
}
class Class {
	var day; //Day of week REQUIRED
	var period; //Period of class REQUIRED
	var length; //Duration of class (in periods)
	var name; //Name of class (optional)
	constructor(d,p) {
		day = d;
		period = p;
		length = 1;
		name = null;
	}
	constructor(d,p,l) {
		day = d;
		period = p;
		length = l;
		name = null;
	}
	constructor(d,p,l,n) {
		day = d;
		period = p;
		length = l;
		name = n;
	}
	constructor(d,p,n) {
		day = d;
		period = p;
		length = 1;
		name = n;
	}
}
class Node {
	Class course;
	Class next;
	constructor(c) {
		this.course = c;
		this.next = null;
	}
}
class LinkedList {
	Node head;
	var size;
	constructor() {
		this.head = null;
		this.size = 0;
	}
	add(input) {
		var in = new Node(input);
		var curr;
		if(this.head == null) {
			this.head = in;
		}
		else {
			curr = this.head;

			while(curr.next != null) {
				curr = curr.next;
			}
			curr.next = in;
			this.size++;
		}
	}
	remove(target) {
		if(target > 0 && target > this.size) {
			return -1;
		}
		else {
			var curr,prev, index = 0;
			curr = this.head;
			prev = curr;
			if(target == 0) {
				this.head = curr.next;
			}
			else {
				while(index < target) {
					index++;
					prev = curr;
					curr = curr.next;
				}
				prev.next = curr.next;
			}
			this.size--;
			return curr.course;
		}
	}
	indexOf(c) {
		if(c >= this.size) {
			return -1;
		}
		var curr = this.head;
		var index = 0;
		while(curr.next != null) {
			if(curr == c) {
				return index;
			}
		}
		if(curr == c) {
			return index;
		}
		else {
			return -1;
		}
	}
	get(c) {
		var count = 0;
		if(c >= this.size) {
			return -1;
		}
		var curr = this.head;
		while(count != c) {
			count++;
			curr = curr.next;
		}
		return curr;
	}
}
class Schedule {
	var classes = new LinkedList();

	//Returns true on success, and false on failure
	boolean addClass(input) {

		for(int c = 0; c < classes.length(); c++) {
			if(classes.get(c).length == 2) {
				if(input.period == classes.get(c).period || input.period == classes.get(c).period+1) {
					return false;
				}
			}
			else {
				if(input.period == classes.get(c).period) {
					return false;
				}
			}
		}
		classes.add(input);
		return true;
	}

	//Returns true if object has been successfully removed. Else returns false on failure
	boolean removeClass(input) {
		int index = classes.indexOf(input);
		if(index < 0) {
			return false;
		}
		else {
			classes.remove(index);
			return true;
		}
	}
}
