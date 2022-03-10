import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Profile status component", () => {
	test("Status in props should be in the state", () => {
		const component = create(<ProfileStatus status="it-camasutra" />);
		const instance = component.getInstance();
		expect(instance.state.status).toBe("it-camasutra");
	});
	test("Type of editmode should be span", () => {
		const component = create(<ProfileStatus status="it-camasutra" />);
		const root = component.root;
		let span = root.findByType("span");
		expect(span).not.toBeNull();
	});
	test("span text is equal it-camasutra", () => {
		const component = create(<ProfileStatus status="it-camasutra" />);
		const root = component.root;
		let span = root.findByType("span");
		expect(span.children[0]).toBe("it-camasutra");
	});
	test("Type of editmode should n t be input", () => {
		const component = create(<ProfileStatus status="it-camasutra" />);
		const root = component.root;
		expect(() => {
			let input = root.findByType("input");
		}).toThrow();
	});
	test("Type of editmode should be input instead of span", () => {
		const component = create(<ProfileStatus status="it-camasutra" />);
		const root = component.root;
		let span = root.findByType("span");
		span.props.onDoubleClick();
		expect(span).not.toBeNull();
	});
	test("Profile Status status should be it-camasutra", () => {
		const component = create(<ProfileStatus status="it-camasutra" />);
		const root = component.root;
		let span = root.findByType("span");
		span.props.onDoubleClick();
		let input = root.findByType("input");
		expect(input.props.value).toBe("it-camasutra");
	});
  test("callback should be called", () => {
		const mockCallback = jest.fn()
    const component = create(<ProfileStatus status="it-camasutra" updateStatus={mockCallback}/>);
		const instance = component.getInstance();
    instance.deActivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1)
	});
});
