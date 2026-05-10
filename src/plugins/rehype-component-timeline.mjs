import { h } from "hastscript";

export function TimelineComponent(_properties, children) {
	return h("div", { class: "flex flex-col mt-4" }, children);
}

export function ProjectComponent(properties, children) {
	const date = properties.date || "";
	const title = properties.title || "";

	return h("div", { class: "flex flex-row w-full group" }, [
		h(
			"div",
			{
				class:
					"w-[12%] md:w-[8%] transition text-right mt-1.5 text-50 font-bold group-hover:text-[var(--primary)] group-hover:-translate-x-1",
			},
			date,
		),
		h("div", { class: "w-[10%] relative flex justify-center" }, [
			h("div", {
				class:
					"absolute inset-y-0 w-[2px] border-l-[2px] border-dashed border-[var(--line-color)]",
			}),
			h("div", {
				class:
					"absolute top-3.5 h-3 w-3 bg-[var(--card-bg)] rounded-full outline outline-[3px] outline-[var(--primary)] -outline-offset-[2px] z-10 transition-all duration-300 group-hover:outline-[4px] group-hover:bg-[var(--primary)] group-hover:scale-110",
			}),
		]),
		h("div", { class: "w-[78%] md:w-[82%] pb-0.5 text-left" }, [
			h(
				"div",
				{
					class:
						"font-bold text-2xl text-90 my-1.5 transition duration-300 group-hover:text-[var(--primary)]",
				},
				title,
			),
			h("div", { class: "prose-sm mb-6" }, children),
		]),
	]);
}

export function ProgressComponent(properties, children) {
	const date = properties.date || "";

	return h("div", { class: "flex flex-row w-full group" }, [
		h(
			"div",
			{
				class:
					"w-[12%] md:w-[8%] transition text-right mt-0.5 text-sm text-50 group-hover:text-[var(--primary)] group-hover:-translate-x-1",
			},
			date,
		),
		h("div", { class: "w-[10%] relative flex justify-center" }, [
			h("div", {
				class:
					"absolute inset-y-0 w-[2px] border-l-[2px] border-dashed border-[var(--line-color)]",
			}),
			h("div", {
				class:
					"absolute top-2 w-1.5 h-1.5 rounded-full bg-[oklch(0.5_0.05_var(--hue))] z-10 transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:scale-150 outline outline-2 outline-[var(--card-bg)]",
			}),
		]),
		h(
			"div",
			{
				class:
					"w-[78%] md:w-[82%] pb-4 text-sm text-75 text-left [&_p]:!my-0.5",
			},
			children,
		),
	]);
}
