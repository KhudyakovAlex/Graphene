import { Fragment as e, Teleport as t, computed as n, createBlock as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, createSlots as s, createTextVNode as c, createVNode as l, defineComponent as u, guardReactiveProps as d, mergeProps as f, nextTick as p, normalizeClass as m, normalizeProps as h, normalizeStyle as g, onBeforeUnmount as _, onMounted as v, onUnmounted as y, openBlock as b, ref as x, renderList as S, renderSlot as C, resolveDynamicComponent as w, toDisplayString as T, unref as E, useSlots as ee, vModelSelect as D, watch as O, withCtx as k, withDirectives as A, withModifiers as j } from "vue";
//#region src/components/base/BaseButton.vue?vue&type=script&setup=true&lang.ts
var M = ["type", "disabled"], N = /*@__PURE__*/ u({
	__name: "BaseButton",
	props: {
		variant: { default: "secondary" },
		size: { default: "md" },
		type: { default: "button" },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let n = t;
		return (t, r) => (b(), a("button", {
			class: m(["g-base-button", [`g-base-button--${e.variant}`, `g-base-button--${e.size}`]]),
			type: e.type,
			disabled: e.disabled,
			onClick: r[0] ||= (e) => n("click", e)
		}, [C(t.$slots, "default", {}, void 0, !0)], 10, M));
	}
}), P = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, F = /*#__PURE__*/ P(N, [["__scopeId", "data-v-4fdaa05d"]]), I = [
	"checked",
	"disabled",
	"aria-label"
], te = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BaseCheckbox",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		ariaLabel: { default: "" }
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			let t = e.target.checked;
			n("update:modelValue", t), n("change", e);
		}
		return (t, n) => (b(), a("label", { class: m(["g-base-checkbox", { "g-base-checkbox--disabled": e.disabled }]) }, [o("input", {
			class: "g-base-checkbox__control",
			type: "checkbox",
			checked: e.modelValue,
			disabled: e.disabled,
			"aria-label": e.ariaLabel || void 0,
			onChange: r
		}, null, 40, I), n[0] ||= o("span", {
			class: "g-base-checkbox__box",
			"aria-hidden": "true"
		}, [o("svg", {
			class: "g-base-checkbox__mark",
			viewBox: "0 0 10 10",
			focusable: "false"
		}, [o("path", { d: "M2 5.2 4.1 7.3 8 2.7" })])], -1)], 2));
	}
}), [["__scopeId", "data-v-4872bbb8"]]), L = {
	key: 0,
	class: "g-base-input__label"
}, ne = { class: "g-base-input__field" }, R = [
	"value",
	"type",
	"placeholder",
	"disabled",
	"readonly",
	"aria-invalid"
], re = {
	key: 0,
	class: "g-base-input__trailing"
}, z = {
	key: 1,
	class: "g-base-input__helper"
}, B = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BaseInput",
	props: {
		modelValue: { default: "" },
		label: { default: "" },
		helperText: { default: "" },
		placeholder: { default: "" },
		type: { default: "text" },
		size: { default: "md" },
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		invalid: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"update:modelValue",
		"input",
		"change",
		"focus",
		"blur"
	],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function s(e) {
			r("input", e), r("update:modelValue", e.target.value);
		}
		return (e, t) => (b(), a("label", { class: m(["g-base-input", [`g-base-input--${n.size}`, {
			"g-base-input--filled": n.modelValue.length > 0,
			"g-base-input--disabled": n.disabled,
			"g-base-input--invalid": n.invalid
		}]]) }, [
			n.label ? (b(), a("span", L, T(n.label), 1)) : i("", !0),
			o("span", ne, [o("input", {
				class: "g-base-input__control",
				value: n.modelValue,
				type: n.type,
				placeholder: n.placeholder,
				disabled: n.disabled,
				readonly: n.readonly,
				"aria-invalid": n.invalid || void 0,
				onInput: s,
				onChange: t[0] ||= (e) => r("change", e),
				onFocus: t[1] ||= (e) => r("focus", e),
				onBlur: t[2] ||= (e) => r("blur", e)
			}, null, 40, R), e.$slots.trailing ? (b(), a("span", re, [C(e.$slots, "trailing", {}, void 0, !0)])) : i("", !0)]),
			n.helperText ? (b(), a("span", z, T(n.helperText), 1)) : i("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-101f853c"]]), V = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BaseLink",
	props: {
		href: { default: "" },
		target: { default: "_self" },
		rel: { default: "" },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["click"],
	setup(e, { emit: t }) {
		let i = e, a = t, o = n(() => i.disabled || !i.href ? "span" : "a"), s = n(() => i.rel ? i.rel : i.target === "_blank" ? "noopener noreferrer" : void 0), c = n(() => o.value === "a" ? {
			href: i.href,
			target: i.target,
			rel: s.value
		} : {
			role: i.disabled ? "link" : void 0,
			"aria-disabled": i.disabled || void 0
		});
		function l(e) {
			if (o.value !== "a") {
				e.preventDefault(), e.stopPropagation();
				return;
			}
			a("click", e);
		}
		return (t, n) => (b(), r(w(o.value), f({ class: ["g-base-link", { "g-base-link--disabled": e.disabled }] }, c.value, { onClick: l }), {
			default: k(() => [C(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, ["class"]));
	}
}), [["__scopeId", "data-v-1baf3b65"]]), H = [
	"checked",
	"value",
	"name",
	"disabled",
	"aria-label"
], U = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BaseRadio",
	props: {
		modelValue: {
			type: [
				String,
				Number,
				Boolean
			],
			default: ""
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: "on"
		},
		name: { default: "" },
		disabled: {
			type: Boolean,
			default: !1
		},
		ariaLabel: { default: "" }
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let r = e, i = t, s = n(() => r.modelValue === r.value);
		function c(e) {
			i("update:modelValue", r.value), i("change", e);
		}
		return (e, t) => (b(), a("label", { class: m(["g-base-radio", { "g-base-radio--disabled": r.disabled }]) }, [o("input", {
			class: "g-base-radio__control",
			type: "radio",
			checked: s.value,
			value: String(r.value),
			name: r.name || void 0,
			disabled: r.disabled,
			"aria-label": r.ariaLabel || void 0,
			onChange: c
		}, null, 40, H), t[0] ||= o("span", {
			class: "g-base-radio__box",
			"aria-hidden": "true"
		}, [o("span", { class: "g-base-radio__mark" })], -1)], 2));
	}
}), [["__scopeId", "data-v-1a38267d"]]), W = "﻿<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\">\r\n  <g transform=\"translate(-72 -72)\">\r\n<path id=\"Icon\" d=\"M90 81L84 88.5L78 81L90 81Z\" fill=\"currentColor\" fill-rule=\"nonzero\" />\r\n  </g>\r\n</svg>\r\n\r\n", G = "﻿<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\">\r\n  <g transform=\"translate(-576 -72)\">\r\n<path id=\"Icon\" d=\"M589.06 84L594 79.0605L592.94 78L588 82.9395L583.06 78L582 79.0605L586.94 84L582 88.9395L583.06 90L588 85.0605L592.94 90L594 88.9395L589.06 84Z\" fill=\"currentColor\" fill-rule=\"nonzero\" />\r\n  </g>\r\n</svg>\r\n\r\n", K = {
	key: 0,
	class: "g-base-select__label"
}, q = { class: "g-base-select__field" }, ie = [
	"multiple",
	"disabled",
	"aria-invalid",
	"aria-readonly",
	"aria-busy"
], J = {
	key: 0,
	value: "",
	disabled: ""
}, ae = ["value", "disabled"], Y = ["innerHTML"], X = {
	key: 1,
	class: "g-base-select__loader",
	"aria-hidden": "true"
}, oe = ["innerHTML"], se = {
	key: 1,
	class: "g-base-select__helper"
}, ce = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BaseSelect",
	props: {
		modelValue: { default: "" },
		options: { default: () => [] },
		label: { default: "" },
		helperText: { default: "" },
		placeholder: { default: "" },
		size: { default: "md" },
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		invalid: {
			type: Boolean,
			default: !1
		},
		loading: {
			type: Boolean,
			default: !1
		},
		clearable: {
			type: Boolean,
			default: !1
		},
		multiple: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"update:modelValue",
		"change",
		"focus",
		"blur",
		"clear"
	],
	setup(t, { emit: r }) {
		let s = t, c = r, l = n(() => (Array.isArray(s.modelValue), s.modelValue.length > 0)), u = n(() => s.multiple ? Array.isArray(s.modelValue) ? s.modelValue : [] : Array.isArray(s.modelValue) ? s.modelValue[0] ?? "" : s.modelValue), d = n({
			get: () => u.value,
			set: (e) => {
				s.readonly || c("update:modelValue", e);
			}
		}), f = n(() => s.clearable && l.value && !s.disabled && !s.readonly && !s.loading);
		function p(e) {
			c("change", e);
		}
		function h() {
			f.value && (c("update:modelValue", s.multiple ? [] : ""), c("clear"));
		}
		return (t, n) => (b(), a("label", { class: m(["g-base-select", [`g-base-select--${s.size}`, {
			"g-base-select--filled": l.value,
			"g-base-select--disabled": s.disabled,
			"g-base-select--readonly": s.readonly,
			"g-base-select--invalid": s.invalid,
			"g-base-select--loading": s.loading,
			"g-base-select--multiple": s.multiple,
			"g-base-select--clearable": f.value
		}]]) }, [
			s.label ? (b(), a("span", K, T(s.label), 1)) : i("", !0),
			o("span", q, [
				A(o("select", {
					"onUpdate:modelValue": n[0] ||= (e) => d.value = e,
					class: "g-base-select__control",
					multiple: s.multiple,
					disabled: s.disabled || s.loading,
					"aria-invalid": s.invalid || void 0,
					"aria-readonly": s.readonly || void 0,
					"aria-busy": s.loading || void 0,
					onChange: p,
					onFocus: n[1] ||= (e) => c("focus", e),
					onBlur: n[2] ||= (e) => c("blur", e)
				}, [s.placeholder && !s.multiple ? (b(), a("option", J, T(s.placeholder), 1)) : i("", !0), (b(!0), a(e, null, S(s.options, (e) => (b(), a("option", {
					key: e.value,
					value: e.value,
					disabled: e.disabled
				}, T(e.label), 9, ae))), 128))], 40, ie), [[D, d.value]]),
				f.value ? (b(), a("button", {
					key: 0,
					class: "g-base-select__clear",
					type: "button",
					"aria-label": "Clear selected value",
					onClick: j(h, ["prevent"])
				}, [o("span", {
					"aria-hidden": "true",
					innerHTML: E(G)
				}, null, 8, Y)])) : i("", !0),
				s.loading ? (b(), a("span", X)) : s.multiple ? i("", !0) : (b(), a("span", {
					key: 2,
					class: "g-base-select__indicator",
					"aria-hidden": "true",
					innerHTML: E(W)
				}, null, 8, oe))
			]),
			s.helperText ? (b(), a("span", se, T(s.helperText), 1)) : i("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-ebc5594a"]]), le = [
	"value",
	"min",
	"max",
	"step",
	"disabled",
	"aria-label"
], Z = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BaseSlider",
	props: {
		modelValue: { default: 0 },
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: !1
		},
		ariaLabel: { default: "" }
	},
	emits: [
		"update:modelValue",
		"input",
		"change"
	],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function i(e) {
			r("input", e), r("update:modelValue", Number(e.target.value));
		}
		function s(e) {
			r("change", e);
		}
		return (e, t) => (b(), a("span", { class: m(["g-base-slider", { "g-base-slider--disabled": n.disabled }]) }, [o("input", {
			class: "g-base-slider__control",
			type: "range",
			value: n.modelValue,
			min: n.min,
			max: n.max,
			step: n.step,
			disabled: n.disabled,
			"aria-label": n.ariaLabel || void 0,
			onInput: i,
			onChange: s
		}, null, 40, le)], 2));
	}
}), [["__scopeId", "data-v-2f632190"]]), ue = [
	"checked",
	"disabled",
	"aria-label"
], de = {
	class: "g-base-switch__track",
	"aria-hidden": "true"
}, fe = { class: "g-base-switch__thumb" }, pe = {
	key: 0,
	class: "g-base-switch__icon",
	viewBox: "0 0 10 10",
	focusable: "false"
}, me = {
	key: 1,
	class: "g-base-switch__icon",
	viewBox: "0 0 10 10",
	focusable: "false"
}, he = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BaseSwitch",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		ariaLabel: { default: "" }
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = t;
		function r(e) {
			let t = e.target.checked;
			n("update:modelValue", t), n("change", e);
		}
		return (t, n) => (b(), a("label", { class: m(["g-base-switch", {
			"g-base-switch--checked": e.modelValue,
			"g-base-switch--disabled": e.disabled
		}]) }, [o("input", {
			class: "g-base-switch__control",
			type: "checkbox",
			checked: e.modelValue,
			disabled: e.disabled,
			"aria-label": e.ariaLabel || void 0,
			onChange: r
		}, null, 40, ue), o("span", de, [o("span", fe, [e.modelValue ? (b(), a("svg", pe, [...n[0] ||= [o("path", { d: "M1.5 5.2 3.9 7.5 8.5 2.8" }, null, -1)]])) : (b(), a("svg", me, [...n[1] ||= [o("path", { d: "M2 2 8 8" }, null, -1), o("path", { d: "M8 2 2 8" }, null, -1)]]))])])], 2));
	}
}), [["__scopeId", "data-v-e454f138"]]), ge = {
	key: 0,
	class: "g-base-textarea__label"
}, _e = [
	"value",
	"placeholder",
	"rows",
	"disabled",
	"readonly",
	"aria-invalid"
], ve = {
	key: 1,
	class: "g-base-textarea__helper"
}, ye = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BaseTextarea",
	props: {
		modelValue: { default: "" },
		label: { default: "" },
		helperText: { default: "" },
		placeholder: { default: "" },
		rows: { default: 4 },
		disabled: {
			type: Boolean,
			default: !1
		},
		readonly: {
			type: Boolean,
			default: !1
		},
		invalid: {
			type: Boolean,
			default: !1
		}
	},
	emits: [
		"update:modelValue",
		"input",
		"change",
		"focus",
		"blur"
	],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function s(e) {
			r("input", e), r("update:modelValue", e.target.value);
		}
		return (e, t) => (b(), a("label", { class: m(["g-base-textarea", {
			"g-base-textarea--filled": n.modelValue.length > 0,
			"g-base-textarea--disabled": n.disabled,
			"g-base-textarea--invalid": n.invalid
		}]) }, [
			n.label ? (b(), a("span", ge, T(n.label), 1)) : i("", !0),
			o("textarea", {
				class: "g-base-textarea__control",
				value: n.modelValue,
				placeholder: n.placeholder,
				rows: n.rows,
				disabled: n.disabled,
				readonly: n.readonly,
				"aria-invalid": n.invalid || void 0,
				onInput: s,
				onChange: t[0] ||= (e) => r("change", e),
				onFocus: t[1] ||= (e) => r("focus", e),
				onBlur: t[2] ||= (e) => r("blur", e)
			}, null, 40, _e),
			n.helperText ? (b(), a("span", ve, T(n.helperText), 1)) : i("", !0)
		], 2));
	}
}), [["__scopeId", "data-v-1bb373c8"]]), be = { class: "g-data-list" }, xe = { class: "g-data-list__item" }, Se = { class: "g-data-list__content" }, Ce = { class: "g-data-list__title" }, we = {
	key: 0,
	class: "g-data-list__supporting"
}, Te = {
	key: 0,
	class: "g-data-list__aside"
}, Ee = {
	key: 0,
	class: "g-data-list__meta"
}, De = {
	key: 1,
	class: "g-data-list__meta"
}, Oe = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "DataList",
	props: { items: {} },
	setup(t) {
		let n = t;
		function r(e, t) {
			return e.key ?? `${e.title}-${t}`;
		}
		return (t, s) => (b(), a("ul", be, [(b(!0), a(e, null, S(n.items, (e, t) => (b(), a("li", {
			key: r(e, t),
			class: "g-data-list__row"
		}, [o("div", xe, [o("div", Se, [o("p", Ce, T(e.title), 1), e.supportingText ? (b(), a("p", we, T(e.supportingText), 1)) : i("", !0)]), e.meta || e.trailing ? (b(), a("div", Te, [e.meta ? (b(), a("p", Ee, T(e.meta), 1)) : i("", !0), e.trailing ? (b(), a("p", De, T(e.trailing), 1)) : i("", !0)])) : i("", !0)])]))), 128))]));
	}
}), [["__scopeId", "data-v-c4a016fb"]]), ke = { class: "g-data-table__table" }, Ae = { class: "g-data-table__head" }, je = { class: "g-data-table__head-row" }, Me = ["title"], Ne = { class: "g-data-table__head-label" }, Pe = { class: "g-data-table__body" }, Fe = ["colspan"], Ie = { class: "g-data-table__section-text" }, Le = ["title"], Re = { class: "g-data-table__cell-text" }, ze = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "DataTable",
	props: {
		columns: {},
		rows: {},
		layout: { default: "fit" },
		rowHover: {
			type: Boolean,
			default: !0
		}
	},
	setup(t) {
		let n = t;
		function r(e, t) {
			return e.key ?? `${c(e)}-row-${t}`;
		}
		function i(e, t) {
			return e[t];
		}
		function s(e) {
			return e == null ? "" : String(e);
		}
		function c(e) {
			return e.kind ?? "default";
		}
		function l(e) {
			return c(e) === "section";
		}
		function u(e) {
			return typeof e.textColor == "string" && e.textColor.trim().length > 0;
		}
		function d(e) {
			return typeof e.label == "string" ? e.label : "";
		}
		function p(e) {
			if (u(e)) return { "--g-data-table-row-accent-text": e.textColor };
		}
		function h(e) {
			return Math.max(e.length, 1);
		}
		function _(e) {
			return e.align ?? "left";
		}
		function v(e) {
			return e.overflow ?? "ellipsis";
		}
		function y(e) {
			if (!(!e.width && !e.minWidth)) return {
				width: e.width,
				minWidth: e.minWidth ?? e.width
			};
		}
		function x(e, t) {
			return {
				column: e,
				columnIndex: t
			};
		}
		function w(e, t, n, r) {
			let a = i(e, t.key);
			return {
				column: t,
				columnIndex: r,
				row: e,
				rowIndex: n,
				value: a,
				text: s(a)
			};
		}
		return (t, E) => (b(), a("div", { class: m(["g-data-table", [`g-data-table--layout-${n.layout}`, { "g-data-table--row-hover": n.rowHover }]]) }, [o("table", ke, [
			o("colgroup", null, [(b(!0), a(e, null, S(n.columns, (e) => (b(), a("col", {
				key: e.key,
				style: g(y(e))
			}, null, 4))), 128))]),
			o("thead", Ae, [o("tr", je, [(b(!0), a(e, null, S(n.columns, (e, n) => (b(), a("th", {
				key: e.key,
				class: m(["g-data-table__head-cell", [
					`g-data-table__head-cell--${_(e)}`,
					`g-data-table__head-cell--overflow-${v(e)}`,
					{ "g-data-table__head-cell--muted": e.muted }
				]]),
				scope: "col",
				title: v(e) === "ellipsis" ? e.label : void 0
			}, [C(t.$slots, `header-${e.key}`, f({ ref_for: !0 }, x(e, n)), () => [C(t.$slots, "header", f({ ref_for: !0 }, x(e, n)), () => [o("span", Ne, T(e.label), 1)], !0)], !0)], 10, Me))), 128))])]),
			o("tbody", Pe, [(b(!0), a(e, null, S(n.rows, (y, x) => (b(), a(e, { key: r(y, x) }, [l(y) ? (b(), a("tr", {
				key: 0,
				class: m(["g-data-table__row g-data-table__row--section", { "g-data-table__row--tinted": u(y) }]),
				style: g(p(y))
			}, [o("td", {
				class: "g-data-table__section-cell",
				colspan: h(n.columns)
			}, [C(t.$slots, "section", {
				row: y,
				rowIndex: x,
				label: d(y)
			}, () => [o("span", Ie, T(d(y)), 1)], !0)], 8, Fe)], 6)) : (b(), a("tr", {
				key: 1,
				class: m(["g-data-table__row", [`g-data-table__row--${c(y)}`, { "g-data-table__row--tinted": u(y) }]]),
				style: g(p(y))
			}, [(b(!0), a(e, null, S(n.columns, (e, n) => (b(), a("td", {
				key: e.key,
				class: m(["g-data-table__cell", [
					`g-data-table__cell--${_(e)}`,
					`g-data-table__cell--overflow-${v(e)}`,
					{ "g-data-table__cell--muted": e.muted }
				]]),
				title: v(e) === "ellipsis" && s(i(y, e.key)) || void 0
			}, [C(t.$slots, `cell-${e.key}`, f({ ref_for: !0 }, w(y, e, x, n)), () => [C(t.$slots, "cell", f({ ref_for: !0 }, w(y, e, x, n)), () => [o("span", Re, T(s(i(y, e.key))), 1)], !0)], !0)], 10, Le))), 128))], 6))], 64))), 128))])
		])], 2));
	}
}), [["__scopeId", "data-v-2b807707"]]), Be = { class: "g-data-grid" }, Ve = {
	key: 0,
	class: "g-data-grid__toolbar"
}, He = {
	key: 0,
	class: "g-data-grid__filters"
}, Ue = {
	key: 1,
	class: "g-data-grid__visibility"
}, We = { class: "g-data-grid__visibility-list" }, Ge = { class: "g-data-grid__toolbar-actions" }, Ke = {
	key: 1,
	class: "g-data-grid__empty"
}, qe = { class: "g-data-grid__head-content" }, Je = ["aria-label", "onClick"], Ye = { class: "g-data-grid__head-label" }, Xe = {
	class: "g-data-grid__sort-indicator",
	"aria-hidden": "true"
}, Ze = {
	key: 1,
	class: "g-data-grid__head-label"
}, Qe = ["onKeydown", "onPointerdown"], $e = { class: "g-data-table__cell-text" }, et = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "DataGrid",
	props: {
		columns: {},
		rows: {},
		layout: { default: "scroll" },
		rowHover: {
			type: Boolean,
			default: !0
		},
		sort: { default: null },
		filters: { default: () => ({}) },
		hiddenColumnKeys: { default: () => [] },
		columnWidths: { default: () => ({}) }
	},
	emits: [
		"update:sort",
		"update:filters",
		"update:hiddenColumnKeys",
		"update:columnWidths"
	],
	setup(t, { emit: u }) {
		let f = t, p = u, g = ee(), v = x(f.sort), y = x({ ...f.filters }), w = x(I(f.columns, f.hiddenColumnKeys)), E = x({ ...f.columnWidths }), D = x(null);
		O(() => f.sort, (e) => {
			v.value = e ?? null;
		}), O(() => f.filters, (e) => {
			y.value = { ...e };
		}, { deep: !0 }), O(() => f.hiddenColumnKeys, (e) => {
			w.value = I(f.columns, e);
		}, { deep: !0 }), O(() => f.columnWidths, (e) => {
			E.value = { ...e };
		}, { deep: !0 }), O(() => f.columns, (e) => {
			w.value = I(e, w.value);
		}, { deep: !0 });
		let A = n(() => f.columns.filter((e) => !w.value.includes(e.key)).map((e) => ({
			...e,
			width: E.value[e.key] ?? e.width
		}))), j = n(() => A.value.filter((e) => e.filterable)), M = n(() => f.columns.filter((e) => e.hideable)), N = n(() => !!g.toolbar || j.value.length > 0 || M.value.length > 0), P = n(() => re(f.rows.filter((e) => ne(e, y.value)), v.value));
		_(() => {
			Z();
		});
		function I(e, t = []) {
			let n = new Set(t);
			for (let t of e) t.defaultHidden && n.add(t.key);
			return [...n];
		}
		function L(e) {
			return e == null ? "" : String(e).trim().toLowerCase();
		}
		function ne(e, t) {
			return Object.entries(t).every(([t, n]) => {
				let r = L(n);
				return !r || L(e[t]).includes(r);
			});
		}
		function R(e, t) {
			return typeof e == "number" && typeof t == "number" ? e - t : typeof e == "boolean" && typeof t == "boolean" ? Number(e) - Number(t) : L(e).localeCompare(L(t), "ru");
		}
		function re(e, t) {
			if (!t) return e;
			let n = t.direction === "asc" ? 1 : -1;
			return e.map((e, t) => ({
				row: e,
				index: t
			})).sort((e, r) => {
				let i = R(e.row[t.key], r.row[t.key]);
				return i === 0 ? e.index - r.index : i * n;
			}).map((e) => e.row);
		}
		function z(e) {
			return v.value?.key === e ? v.value.direction : null;
		}
		function V(e) {
			let t = z(e);
			return t === "asc" ? "↑" : t === "desc" ? "↓" : "↕";
		}
		function H(e) {
			v.value = e, p("update:sort", e);
		}
		function U(e) {
			if (!e.sortable) return;
			let t = v.value;
			if (!t || t.key !== e.key) {
				H({
					key: e.key,
					direction: "asc"
				});
				return;
			}
			if (t.direction === "asc") {
				H({
					key: e.key,
					direction: "desc"
				});
				return;
			}
			H(null);
		}
		function W(e, t) {
			let n = { ...y.value };
			t.trim() ? n[e] = t : delete n[e], y.value = n, p("update:filters", n);
		}
		function G(e) {
			w.value = e, p("update:hiddenColumnKeys", e);
		}
		function K(e, t) {
			let n = new Set(w.value);
			t ? n.delete(e) : n.add(e), G([...n]);
		}
		function q(e) {
			E.value = e, p("update:columnWidths", e);
		}
		function ie() {
			J({});
		}
		function J(e) {
			y.value = e, p("update:filters", e);
		}
		function ae() {
			H(null), J({}), G(I(f.columns)), q({});
		}
		function Y(e) {
			if (!e) return null;
			let t = e.trim();
			if (!t.endsWith("px")) return null;
			let n = Number.parseFloat(t);
			return Number.isFinite(n) ? n : null;
		}
		function X(e) {
			return Y(e.minWidth) ?? Y(e.width) ?? Y(E.value[e.key]) ?? 96;
		}
		function oe(e) {
			return Y(E.value[e.key]) ?? Y(e.width) ?? X(e);
		}
		function se(e, t) {
			let n = Math.max(X(e), oe(e) + t);
			q({
				...E.value,
				[e.key]: `${Math.round(n)}px`
			});
		}
		function ce(e, t) {
			let n = e.currentTarget.closest("th");
			n && (D.value = {
				columnKey: t.key,
				minWidth: X(t),
				pointerId: e.pointerId,
				startWidth: n.getBoundingClientRect().width,
				startX: e.clientX
			}, window.addEventListener("pointermove", le), window.addEventListener("pointerup", Z), window.addEventListener("pointercancel", Z), e.preventDefault(), e.stopPropagation());
		}
		function le(e) {
			let t = D.value;
			if (!t || e.pointerId !== t.pointerId) return;
			let n = Math.max(t.minWidth, t.startWidth + e.clientX - t.startX);
			q({
				...E.value,
				[t.columnKey]: `${Math.round(n)}px`
			});
		}
		function Z(e) {
			e && D.value && e.pointerId !== D.value.pointerId || (D.value = null, window.removeEventListener("pointermove", le), window.removeEventListener("pointerup", Z), window.removeEventListener("pointercancel", Z));
		}
		function ue(e, t) {
			e.key === "ArrowLeft" && (e.preventDefault(), se(t, -16)), e.key === "ArrowRight" && (e.preventDefault(), se(t, 16));
		}
		function de() {
			return {
				columnWidths: E.value,
				columns: f.columns,
				filters: y.value,
				hiddenColumnKeys: w.value,
				resetGrid: ae,
				setColumnVisibility: K,
				setFilter: W,
				setSort: H,
				sort: v.value,
				toggleSort: U,
				visibleColumns: A.value
			};
		}
		function fe(e, t) {
			return {
				...e,
				sort: v.value,
				sortDirection: z(t.key),
				toggleSort: U
			};
		}
		function pe(e) {
			return {
				...e,
				sort: v.value
			};
		}
		return (t, n) => (b(), a("section", Be, [N.value ? (b(), a("div", Ve, [C(t.$slots, "toolbar", h(d(de())), () => [
			j.value.length > 0 ? (b(), a("div", He, [(b(!0), a(e, null, S(j.value, (e) => (b(), r(B, {
				key: e.key,
				label: e.label,
				"model-value": y.value[e.key] ?? "",
				placeholder: "Фильтр",
				size: "sm",
				"onUpdate:modelValue": (t) => W(e.key, t)
			}, null, 8, [
				"label",
				"model-value",
				"onUpdate:modelValue"
			]))), 128))])) : i("", !0),
			M.value.length > 0 ? (b(), a("div", Ue, [n[0] ||= o("p", { class: "g-data-grid__toolbar-title" }, "Колонки", -1), o("div", We, [(b(!0), a(e, null, S(M.value, (e) => (b(), a("div", {
				key: e.key,
				class: "g-data-grid__visibility-item"
			}, [l(te, {
				"model-value": !w.value.includes(e.key),
				"aria-label": `Показать колонку ${e.label}`,
				"onUpdate:modelValue": (t) => K(e.key, t)
			}, null, 8, [
				"model-value",
				"aria-label",
				"onUpdate:modelValue"
			]), o("span", null, T(e.label), 1)]))), 128))])])) : i("", !0),
			o("div", Ge, [l(F, {
				size: "sm",
				onClick: ae
			}, {
				default: k(() => [...n[1] ||= [c("Сбросить вид", -1)]]),
				_: 1
			}), Object.keys(y.value).length > 0 ? (b(), r(F, {
				key: 0,
				size: "sm",
				variant: "secondary",
				onClick: ie
			}, {
				default: k(() => [...n[2] ||= [c(" Очистить фильтры ", -1)]]),
				_: 1
			})) : i("", !0)])
		], !0)])) : i("", !0), A.value.length === 0 ? (b(), a("div", Ke, " Скрыты все колонки. Покажите хотя бы одну колонку в настройках вида. ")) : (b(), r(ze, {
			key: 2,
			columns: A.value,
			layout: f.layout,
			"row-hover": f.rowHover,
			rows: P.value
		}, s({ _: 2 }, [S(A.value, (e) => ({
			name: `header-${e.key}`,
			fn: k((n) => [C(t.$slots, `header-${e.key}`, h(d(fe(n, e))), () => [C(t.$slots, "header", h(d(fe(n, e))), () => [o("div", qe, [e.sortable ? (b(), a("button", {
				key: 0,
				type: "button",
				class: m(["g-data-grid__sort-button", { "g-data-grid__sort-button--active": z(e.key) !== null }]),
				"aria-label": `Сменить сортировку по колонке ${e.label}`,
				onClick: (t) => U(e)
			}, [o("span", Ye, T(e.label), 1), o("span", Xe, T(V(e.key)), 1)], 10, Je)) : (b(), a("span", Ze, T(e.label), 1)), e.resizable ? (b(), a("span", {
				key: 2,
				class: "g-data-grid__resize-handle",
				"aria-label": "Изменить ширину колонки",
				role: "separator",
				tabindex: "0",
				onKeydown: (t) => ue(t, e),
				onPointerdown: (t) => ce(t, e)
			}, null, 40, Qe)) : i("", !0)])], !0)], !0)])
		})), S(A.value, (e) => ({
			name: `cell-${e.key}`,
			fn: k((n) => [C(t.$slots, `cell-${e.key}`, h(d(pe(n))), () => [C(t.$slots, "cell", h(d(pe(n))), () => [o("span", $e, T(n.text), 1)], !0)], !0)])
		}))]), 1032, [
			"columns",
			"layout",
			"row-hover",
			"rows"
		]))]));
	}
}), [["__scopeId", "data-v-2e5bc0d1"]]), tt = { class: "g-property-list" }, nt = { class: "g-property-list__label" }, rt = { class: "g-property-list__value" }, it = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "PropertyList",
	props: { items: {} },
	setup(t) {
		let n = t;
		function r(e, t) {
			return e.key ?? `${e.label}-${t}`;
		}
		return (t, i) => (b(), a("dl", tt, [(b(!0), a(e, null, S(n.items, (e, t) => (b(), a("div", {
			key: r(e, t),
			class: "g-property-list__row"
		}, [o("dt", nt, T(e.label), 1), o("dd", rt, T(e.value), 1)]))), 128))]));
	}
}), [["__scopeId", "data-v-100011a3"]]), at = ["aria-labelledby", "aria-label"], ot = {
	key: 0,
	class: "g-base-dialog__header"
}, st = ["aria-label"], ct = { class: "g-base-dialog__body" }, lt = {
	key: 1,
	class: "g-base-dialog__footer"
}, Q = 0, ut = "", dt = 0, $ = [], ft = /* @__PURE__ */ new Map(), pt = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "BaseDialog",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		title: { default: "" },
		ariaLabel: { default: "" },
		closeOnBackdrop: {
			type: Boolean,
			default: !0
		},
		closeOnEscape: {
			type: Boolean,
			default: !0
		},
		showCloseButton: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: s }) {
		dt += 1;
		let l = dt, u = `g-base-dialog-title-${l}`, d = e, f = s, m = ee(), h = x(null), g = x(null), _ = x(!1), S = x(!1), w = null, E = n(() => !!(d.title || m.title)), D = n(() => E.value || d.showCloseButton), k = n(() => !!m.footer), A = n(() => E.value ? void 0 : d.ariaLabel || "Dialog");
		function M() {
			return $[$.length - 1] === l;
		}
		function N() {
			if (!h.value) return [];
			let e = [
				"a[href]",
				"button:not([disabled])",
				"input:not([disabled])",
				"select:not([disabled])",
				"textarea:not([disabled])",
				"[tabindex]:not([tabindex=\"-1\"])"
			].join(", ");
			return Array.from(h.value.querySelectorAll(e)).filter((e) => e instanceof HTMLElement && !e.hasAttribute("hidden") && e.tabIndex >= 0);
		}
		function P() {
			if (d.showCloseButton && g.value) {
				g.value.focus();
				return;
			}
			let [e] = N();
			if (e) {
				e.focus();
				return;
			}
			h.value?.focus();
		}
		function F() {
			let e = $[$.length - 1];
			ft.get(e)?.();
		}
		function I(e) {
			if (!h.value) return;
			let t = N();
			if (t.length === 0) {
				e.preventDefault(), h.value.focus();
				return;
			}
			let n = t[0], r = t[t.length - 1], i = document.activeElement, a = i instanceof Node && h.value.contains(i);
			if (e.shiftKey) {
				(!a || i === n || i === h.value) && (e.preventDefault(), r.focus());
				return;
			}
			(!a || i === r || i === h.value) && (e.preventDefault(), n.focus());
		}
		function te() {
			typeof document > "u" || _.value || (Q === 0 && (ut = document.body.style.overflow), Q += 1, document.body.style.overflow = "hidden", _.value = !0);
		}
		function L() {
			S.value ||= ($.push(l), !0);
		}
		function ne() {
			typeof document > "u" || !_.value || (Q = Math.max(0, Q - 1), Q === 0 && (document.body.style.overflow = ut), _.value = !1);
		}
		function R() {
			if (!S.value) return;
			let e = $.lastIndexOf(l);
			e !== -1 && $.splice(e, 1), S.value = !1;
		}
		function re() {
			let e = w;
			w = null, p(() => {
				if (e?.isConnected) {
					e.focus();
					return;
				}
				F();
			});
		}
		function z() {
			typeof document < "u" && !S.value && (w = document.activeElement instanceof HTMLElement ? document.activeElement : null), L(), te();
		}
		function B() {
			let e = M();
			R(), ne(), e && re();
		}
		function V(e) {
			f("update:modelValue", !1), f("close", e);
		}
		function H() {
			d.closeOnBackdrop && V("backdrop");
		}
		function U(e) {
			if (!(!d.modelValue || !M())) {
				if (e.key === "Tab") {
					I(e);
					return;
				}
				e.key === "Escape" && d.closeOnEscape && (e.preventDefault(), V("escape"));
			}
		}
		return O(() => d.modelValue, async (e, t) => {
			if (e) {
				z(), await p(), P();
				return;
			}
			t && B();
		}, { immediate: !0 }), v(() => {
			ft.set(l, P), document.addEventListener("keydown", U);
		}), y(() => {
			ft.delete(l), document.removeEventListener("keydown", U), B();
		}), (n, s) => (b(), r(t, { to: "body" }, [e.modelValue ? (b(), a("div", {
			key: 0,
			class: "g-base-dialog",
			onClick: j(H, ["self"])
		}, [s[2] ||= o("div", {
			class: "g-base-dialog__backdrop",
			"aria-hidden": "true"
		}, null, -1), o("section", {
			ref_key: "panelRef",
			ref: h,
			class: "g-base-dialog__panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": E.value ? u : void 0,
			"aria-label": A.value,
			tabindex: "-1"
		}, [
			D.value ? (b(), a("header", ot, [E.value ? (b(), a("h2", {
				key: 0,
				id: u,
				class: "g-base-dialog__title"
			}, [C(n.$slots, "title", {}, () => [c(T(e.title), 1)], !0)])) : i("", !0), e.showCloseButton ? (b(), a("button", {
				key: 1,
				ref_key: "closeButtonRef",
				ref: g,
				class: "g-base-dialog__close",
				type: "button",
				"aria-label": E.value ? "Close dialog" : "Close",
				onClick: s[0] ||= (e) => V("close-button")
			}, [...s[1] ||= [o("span", {
				class: "g-base-dialog__close-icon",
				"aria-hidden": "true"
			}, null, -1)]], 8, st)) : i("", !0)])) : i("", !0),
			o("div", ct, [C(n.$slots, "default", {}, void 0, !0)]),
			k.value ? (b(), a("footer", lt, [C(n.$slots, "footer", {}, void 0, !0)])) : i("", !0)
		], 8, at)])) : i("", !0)]));
	}
}), [["__scopeId", "data-v-e5ff3e47"]]), mt = { class: "g-confirm-dialog" }, ht = {
	key: 0,
	class: "g-confirm-dialog__description"
}, gt = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "ConfirmDialog",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		title: { default: "" },
		description: { default: "" },
		ariaLabel: { default: "" },
		confirmText: { default: "Confirm" },
		cancelText: { default: "Cancel" },
		confirmVariant: { default: "primary" },
		confirmDisabled: {
			type: Boolean,
			default: !1
		},
		cancelDisabled: {
			type: Boolean,
			default: !1
		},
		closeOnBackdrop: {
			type: Boolean,
			default: !0
		},
		closeOnEscape: {
			type: Boolean,
			default: !0
		},
		showCloseButton: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"update:modelValue",
		"confirm",
		"cancel",
		"close"
	],
	setup(e, { emit: t }) {
		let n = t;
		function s() {
			n("cancel"), n("update:modelValue", !1);
		}
		function u() {
			n("confirm"), n("update:modelValue", !1);
		}
		function d(e) {
			n("close", e);
		}
		return (t, f) => (b(), r(pt, {
			"model-value": e.modelValue,
			title: e.title,
			"aria-label": e.ariaLabel,
			"close-on-backdrop": e.closeOnBackdrop,
			"close-on-escape": e.closeOnEscape,
			"show-close-button": e.showCloseButton,
			"onUpdate:modelValue": f[0] ||= (e) => n("update:modelValue", e),
			onClose: d
		}, {
			footer: k(() => [C(t.$slots, "footer", {}, () => [l(F, {
				disabled: e.cancelDisabled,
				onClick: s
			}, {
				default: k(() => [c(T(e.cancelText), 1)]),
				_: 1
			}, 8, ["disabled"]), l(F, {
				variant: e.confirmVariant,
				disabled: e.confirmDisabled,
				onClick: u
			}, {
				default: k(() => [c(T(e.confirmText), 1)]),
				_: 1
			}, 8, ["variant", "disabled"])], !0)]),
			default: k(() => [o("div", mt, [e.description ? (b(), a("p", ht, T(e.description), 1)) : i("", !0), C(t.$slots, "default", {}, void 0, !0)])]),
			_: 3
		}, 8, [
			"model-value",
			"title",
			"aria-label",
			"close-on-backdrop",
			"close-on-escape",
			"show-close-button"
		]));
	}
}), [["__scopeId", "data-v-b60e1d7f"]]), _t = ["id", "aria-busy"], vt = {
	key: 0,
	class: "g-form-dialog__description"
}, yt = { class: "g-form-dialog__body" }, bt = 0, xt = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "FormDialog",
	props: {
		modelValue: {
			type: Boolean,
			default: !1
		},
		title: { default: "" },
		description: { default: "" },
		ariaLabel: { default: "" },
		submitText: { default: "Save" },
		cancelText: { default: "Cancel" },
		submitDisabled: {
			type: Boolean,
			default: !1
		},
		cancelDisabled: {
			type: Boolean,
			default: !1
		},
		submitting: {
			type: Boolean,
			default: !1
		},
		formId: { default: "" },
		closeOnBackdrop: {
			type: Boolean,
			default: !0
		},
		closeOnEscape: {
			type: Boolean,
			default: !0
		},
		showCloseButton: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"update:modelValue",
		"submit",
		"cancel",
		"close"
	],
	setup(e, { emit: t }) {
		bt += 1;
		let s = bt, u = e, d = t, f = n(() => u.formId || `g-form-dialog-form-${s}`), p = n(() => u.submitDisabled || u.submitting), m = n(() => u.cancelDisabled || u.submitting);
		function h() {
			m.value || (d("cancel"), d("update:modelValue", !1));
		}
		function g(e) {
			p.value || d("submit", e);
		}
		function _(e) {
			d("close", e);
		}
		return (t, n) => (b(), r(pt, {
			"model-value": e.modelValue,
			title: e.title,
			"aria-label": e.ariaLabel,
			"close-on-backdrop": e.closeOnBackdrop,
			"close-on-escape": e.closeOnEscape,
			"show-close-button": e.showCloseButton,
			"onUpdate:modelValue": n[0] ||= (e) => d("update:modelValue", e),
			onClose: _
		}, {
			footer: k(() => [C(t.$slots, "footer", {}, () => [l(F, {
				disabled: m.value,
				onClick: h
			}, {
				default: k(() => [c(T(e.cancelText), 1)]),
				_: 1
			}, 8, ["disabled"]), l(F, {
				variant: "primary",
				type: "submit",
				form: f.value,
				disabled: p.value
			}, {
				default: k(() => [c(T(e.submitText), 1)]),
				_: 1
			}, 8, ["form", "disabled"])], !0)]),
			default: k(() => [o("form", {
				id: f.value,
				class: "g-form-dialog",
				"aria-busy": e.submitting || void 0,
				onSubmit: j(g, ["prevent"])
			}, [e.description ? (b(), a("p", vt, T(e.description), 1)) : i("", !0), o("div", yt, [C(t.$slots, "default", {}, void 0, !0)])], 40, _t)]),
			_: 3
		}, 8, [
			"model-value",
			"title",
			"aria-label",
			"close-on-backdrop",
			"close-on-escape",
			"show-close-button"
		]));
	}
}), [["__scopeId", "data-v-ca2ec71d"]]), St = /*#__PURE__*/ P(/* @__PURE__ */ u({
	__name: "Panel",
	props: { as: { default: "section" } },
	setup(e) {
		return (t, n) => (b(), r(w(e.as), { class: "g-panel" }, {
			default: k(() => [C(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}));
	}
}), [["__scopeId", "data-v-92e98c4c"]]);
//#endregion
export { F as BaseButton, te as BaseCheckbox, pt as BaseDialog, B as BaseInput, V as BaseLink, U as BaseRadio, ce as BaseSelect, Z as BaseSlider, he as BaseSwitch, ye as BaseTextarea, gt as ConfirmDialog, et as DataGrid, Oe as DataList, ze as DataTable, xt as FormDialog, St as Panel, it as PropertyList };
