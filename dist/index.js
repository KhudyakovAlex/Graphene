import { Fragment as e, Teleport as t, computed as n, createBlock as r, createCommentVNode as i, createElementBlock as a, createElementVNode as o, createSlots as s, createTextVNode as c, createVNode as l, defineComponent as u, guardReactiveProps as d, mergeProps as f, nextTick as p, normalizeClass as m, normalizeProps as h, normalizeStyle as g, onBeforeUnmount as _, onMounted as v, onUnmounted as y, openBlock as b, ref as x, renderList as S, renderSlot as C, resolveDynamicComponent as w, toDisplayString as T, unref as E, useAttrs as D, useSlots as ee, vModelSelect as O, watch as k, withCtx as A, withDirectives as j, withModifiers as M } from "vue";
//#region src/components/base/BaseButton.vue?vue&type=script&setup=true&lang.ts
var N = ["type", "disabled"], P = /*@__PURE__*/ u({
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
		}, [C(t.$slots, "default", {}, void 0, !0)], 10, N));
	}
}), F = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, I = /*#__PURE__*/ F(P, [["__scopeId", "data-v-4fdaa05d"]]), L = [
	"checked",
	"disabled",
	"aria-label"
], R = /*#__PURE__*/ F(/* @__PURE__ */ u({
	inheritAttrs: !1,
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
		let r = t, i = D(), s = n(() => ({
			class: i.class,
			style: i.style
		})), c = n(() => {
			let e = { ...i };
			return delete e.class, delete e.style, e;
		});
		function l(e) {
			let t = e.target.checked;
			r("update:modelValue", t), r("change", e);
		}
		return (t, n) => (b(), a("label", f(s.value, { class: ["g-base-checkbox", { "g-base-checkbox--disabled": e.disabled }] }), [o("input", f(c.value, {
			class: "g-base-checkbox__control",
			type: "checkbox",
			checked: e.modelValue,
			disabled: e.disabled,
			"aria-label": e.ariaLabel || void 0,
			onChange: l
		}), null, 16, L), n[0] ||= o("span", {
			class: "g-base-checkbox__box",
			"aria-hidden": "true"
		}, [o("svg", {
			class: "g-base-checkbox__mark",
			viewBox: "0 0 10 10",
			focusable: "false"
		}, [o("path", { d: "M2 5.2 4.1 7.3 8 2.7" })])], -1)], 16));
	}
}), [["__scopeId", "data-v-bc48e5af"]]), z = {
	key: 0,
	class: "g-base-input__label"
}, te = { class: "g-base-input__field" }, ne = [
	"value",
	"type",
	"placeholder",
	"disabled",
	"readonly",
	"aria-invalid"
], B = {
	key: 0,
	class: "g-base-input__trailing"
}, V = {
	key: 1,
	class: "g-base-input__helper"
}, H = /*#__PURE__*/ F(/* @__PURE__ */ u({
	inheritAttrs: !1,
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
		let r = e, s = t, c = D(), l = n(() => ({
			class: c.class,
			style: c.style
		})), u = n(() => {
			let e = { ...c };
			return delete e.class, delete e.style, e;
		});
		function d(e) {
			s("input", e), s("update:modelValue", e.target.value);
		}
		return (e, t) => (b(), a("label", f(l.value, { class: ["g-base-input", [`g-base-input--${r.size}`, {
			"g-base-input--filled": r.modelValue.length > 0,
			"g-base-input--disabled": r.disabled,
			"g-base-input--invalid": r.invalid
		}]] }), [
			r.label ? (b(), a("span", z, T(r.label), 1)) : i("", !0),
			o("span", te, [o("input", f(u.value, {
				class: "g-base-input__control",
				value: r.modelValue,
				type: r.type,
				placeholder: r.placeholder,
				disabled: r.disabled,
				readonly: r.readonly,
				"aria-invalid": r.invalid || void 0,
				onInput: d,
				onChange: t[0] ||= (e) => s("change", e),
				onFocus: t[1] ||= (e) => s("focus", e),
				onBlur: t[2] ||= (e) => s("blur", e)
			}), null, 16, ne), e.$slots.trailing ? (b(), a("span", B, [C(e.$slots, "trailing", {}, void 0, !0)])) : i("", !0)]),
			r.helperText ? (b(), a("span", V, T(r.helperText), 1)) : i("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-2cfc9be1"]]), U = /*#__PURE__*/ F(/* @__PURE__ */ u({
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
			default: A(() => [C(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 16, ["class"]));
	}
}), [["__scopeId", "data-v-1baf3b65"]]), W = [
	"checked",
	"value",
	"name",
	"disabled",
	"aria-label"
], G = /*#__PURE__*/ F(/* @__PURE__ */ u({
	inheritAttrs: !1,
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
		let r = e, i = t, s = D(), c = n(() => r.modelValue === r.value), l = n(() => ({
			class: s.class,
			style: s.style
		})), u = n(() => {
			let e = { ...s };
			return delete e.class, delete e.style, e;
		});
		function d(e) {
			i("update:modelValue", r.value), i("change", e);
		}
		return (e, t) => (b(), a("label", f(l.value, { class: ["g-base-radio", { "g-base-radio--disabled": r.disabled }] }), [o("input", f(u.value, {
			class: "g-base-radio__control",
			type: "radio",
			checked: c.value,
			value: String(r.value),
			name: r.name || void 0,
			disabled: r.disabled,
			"aria-label": r.ariaLabel || void 0,
			onChange: d
		}), null, 16, W), t[0] ||= o("span", {
			class: "g-base-radio__box",
			"aria-hidden": "true"
		}, [o("span", { class: "g-base-radio__mark" })], -1)], 16));
	}
}), [["__scopeId", "data-v-39284670"]]), K = "﻿<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\">\r\n  <g transform=\"translate(-72 -72)\">\r\n<path id=\"Icon\" d=\"M90 81L84 88.5L78 81L90 81Z\" fill=\"currentColor\" fill-rule=\"nonzero\" />\r\n  </g>\r\n</svg>\r\n\r\n", q = "﻿<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\">\r\n  <g transform=\"translate(-576 -72)\">\r\n<path id=\"Icon\" d=\"M589.06 84L594 79.0605L592.94 78L588 82.9395L583.06 78L582 79.0605L586.94 84L582 88.9395L583.06 90L588 85.0605L592.94 90L594 88.9395L589.06 84Z\" fill=\"currentColor\" fill-rule=\"nonzero\" />\r\n  </g>\r\n</svg>\r\n\r\n", J = {
	key: 0,
	class: "g-base-select__label"
}, re = { class: "g-base-select__field" }, ie = [
	"multiple",
	"disabled",
	"aria-invalid",
	"aria-readonly",
	"aria-busy"
], ae = {
	key: 0,
	value: "",
	disabled: ""
}, Y = ["value", "disabled"], X = ["innerHTML"], oe = {
	key: 1,
	class: "g-base-select__loader",
	"aria-hidden": "true"
}, se = ["innerHTML"], ce = {
	key: 1,
	class: "g-base-select__helper"
}, le = /*#__PURE__*/ F(/* @__PURE__ */ u({
	inheritAttrs: !1,
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
		let s = t, c = r, l = D(), u = n(() => (Array.isArray(s.modelValue), s.modelValue.length > 0)), d = n(() => s.multiple ? Array.isArray(s.modelValue) ? s.modelValue : [] : Array.isArray(s.modelValue) ? s.modelValue[0] ?? "" : s.modelValue), p = n({
			get: () => d.value,
			set: (e) => {
				s.readonly || c("update:modelValue", e);
			}
		}), m = n(() => s.clearable && u.value && !s.disabled && !s.readonly && !s.loading), h = n(() => ({
			class: l.class,
			style: l.style
		})), g = n(() => {
			let e = { ...l };
			return delete e.class, delete e.style, e;
		});
		function _(e) {
			c("change", e);
		}
		function v() {
			m.value && (c("update:modelValue", s.multiple ? [] : ""), c("clear"));
		}
		return (t, n) => (b(), a("label", f(h.value, { class: ["g-base-select", [`g-base-select--${s.size}`, {
			"g-base-select--filled": u.value,
			"g-base-select--disabled": s.disabled,
			"g-base-select--readonly": s.readonly,
			"g-base-select--invalid": s.invalid,
			"g-base-select--loading": s.loading,
			"g-base-select--multiple": s.multiple,
			"g-base-select--clearable": m.value
		}]] }), [
			s.label ? (b(), a("span", J, T(s.label), 1)) : i("", !0),
			o("span", re, [
				j(o("select", f({ "onUpdate:modelValue": n[0] ||= (e) => p.value = e }, g.value, {
					class: "g-base-select__control",
					multiple: s.multiple,
					disabled: s.disabled || s.loading,
					"aria-invalid": s.invalid || void 0,
					"aria-readonly": s.readonly || void 0,
					"aria-busy": s.loading || void 0,
					onChange: _,
					onFocus: n[1] ||= (e) => c("focus", e),
					onBlur: n[2] ||= (e) => c("blur", e)
				}), [s.placeholder && !s.multiple ? (b(), a("option", ae, T(s.placeholder), 1)) : i("", !0), (b(!0), a(e, null, S(s.options, (e) => (b(), a("option", {
					key: e.value,
					value: e.value,
					disabled: e.disabled
				}, T(e.label), 9, Y))), 128))], 16, ie), [[O, p.value]]),
				m.value ? (b(), a("button", {
					key: 0,
					class: "g-base-select__clear",
					type: "button",
					"aria-label": "Clear selected value",
					onClick: M(v, ["prevent"])
				}, [o("span", {
					"aria-hidden": "true",
					innerHTML: E(q)
				}, null, 8, X)])) : i("", !0),
				s.loading ? (b(), a("span", oe)) : s.multiple ? i("", !0) : (b(), a("span", {
					key: 2,
					class: "g-base-select__indicator",
					"aria-hidden": "true",
					innerHTML: E(K)
				}, null, 8, se))
			]),
			s.helperText ? (b(), a("span", ce, T(s.helperText), 1)) : i("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-69f1db60"]]), Z = [
	"value",
	"min",
	"max",
	"step",
	"disabled",
	"aria-label"
], ue = /*#__PURE__*/ F(/* @__PURE__ */ u({
	inheritAttrs: !1,
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
		let r = e, i = t, s = D(), c = n(() => ({
			class: s.class,
			style: s.style
		})), l = n(() => {
			let e = { ...s };
			return delete e.class, delete e.style, e;
		});
		function u(e) {
			i("input", e), i("update:modelValue", Number(e.target.value));
		}
		function d(e) {
			i("change", e);
		}
		return (e, t) => (b(), a("span", f(c.value, { class: ["g-base-slider", { "g-base-slider--disabled": r.disabled }] }), [o("input", f(l.value, {
			class: "g-base-slider__control",
			type: "range",
			value: r.modelValue,
			min: r.min,
			max: r.max,
			step: r.step,
			disabled: r.disabled,
			"aria-label": r.ariaLabel || void 0,
			onInput: u,
			onChange: d
		}), null, 16, Z)], 16));
	}
}), [["__scopeId", "data-v-951a1925"]]), de = [
	"checked",
	"disabled",
	"aria-label"
], fe = {
	class: "g-base-switch__track",
	"aria-hidden": "true"
}, pe = { class: "g-base-switch__thumb" }, me = {
	key: 0,
	class: "g-base-switch__icon",
	viewBox: "0 0 10 10",
	focusable: "false"
}, he = {
	key: 1,
	class: "g-base-switch__icon",
	viewBox: "0 0 10 10",
	focusable: "false"
}, ge = /*#__PURE__*/ F(/* @__PURE__ */ u({
	inheritAttrs: !1,
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
		let r = t, i = D(), s = n(() => ({
			class: i.class,
			style: i.style
		})), c = n(() => {
			let e = { ...i };
			return delete e.class, delete e.style, e;
		});
		function l(e) {
			let t = e.target.checked;
			r("update:modelValue", t), r("change", e);
		}
		return (t, n) => (b(), a("label", f(s.value, { class: ["g-base-switch", {
			"g-base-switch--checked": e.modelValue,
			"g-base-switch--disabled": e.disabled
		}] }), [o("input", f(c.value, {
			class: "g-base-switch__control",
			type: "checkbox",
			checked: e.modelValue,
			disabled: e.disabled,
			"aria-label": e.ariaLabel || void 0,
			onChange: l
		}), null, 16, de), o("span", fe, [o("span", pe, [e.modelValue ? (b(), a("svg", me, [...n[0] ||= [o("path", { d: "M1.5 5.2 3.9 7.5 8.5 2.8" }, null, -1)]])) : (b(), a("svg", he, [...n[1] ||= [o("path", { d: "M2 2 8 8" }, null, -1), o("path", { d: "M8 2 2 8" }, null, -1)]]))])])], 16));
	}
}), [["__scopeId", "data-v-850cd97e"]]), _e = {
	key: 0,
	class: "g-base-textarea__label"
}, ve = [
	"value",
	"placeholder",
	"rows",
	"disabled",
	"readonly",
	"aria-invalid"
], ye = {
	key: 1,
	class: "g-base-textarea__helper"
}, be = /*#__PURE__*/ F(/* @__PURE__ */ u({
	inheritAttrs: !1,
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
		let r = e, s = t, c = D(), l = n(() => ({
			class: c.class,
			style: c.style
		})), u = n(() => {
			let e = { ...c };
			return delete e.class, delete e.style, e;
		});
		function d(e) {
			s("input", e), s("update:modelValue", e.target.value);
		}
		return (e, t) => (b(), a("label", f(l.value, { class: ["g-base-textarea", {
			"g-base-textarea--filled": r.modelValue.length > 0,
			"g-base-textarea--disabled": r.disabled,
			"g-base-textarea--invalid": r.invalid
		}] }), [
			r.label ? (b(), a("span", _e, T(r.label), 1)) : i("", !0),
			o("textarea", f(u.value, {
				class: "g-base-textarea__control",
				value: r.modelValue,
				placeholder: r.placeholder,
				rows: r.rows,
				disabled: r.disabled,
				readonly: r.readonly,
				"aria-invalid": r.invalid || void 0,
				onInput: d,
				onChange: t[0] ||= (e) => s("change", e),
				onFocus: t[1] ||= (e) => s("focus", e),
				onBlur: t[2] ||= (e) => s("blur", e)
			}), null, 16, ve),
			r.helperText ? (b(), a("span", ye, T(r.helperText), 1)) : i("", !0)
		], 16));
	}
}), [["__scopeId", "data-v-1b9d1d1c"]]), xe = { class: "g-data-list" }, Se = { class: "g-data-list__item" }, Ce = { class: "g-data-list__content" }, we = { class: "g-data-list__title" }, Te = {
	key: 0,
	class: "g-data-list__supporting"
}, Ee = {
	key: 0,
	class: "g-data-list__aside"
}, De = {
	key: 0,
	class: "g-data-list__meta"
}, Oe = {
	key: 1,
	class: "g-data-list__meta"
}, ke = /*#__PURE__*/ F(/* @__PURE__ */ u({
	__name: "DataList",
	props: { items: {} },
	setup(t) {
		let n = t;
		function r(e, t) {
			return e.key ?? `${e.title}-${t}`;
		}
		return (t, s) => (b(), a("ul", xe, [(b(!0), a(e, null, S(n.items, (e, t) => (b(), a("li", {
			key: r(e, t),
			class: "g-data-list__row"
		}, [o("div", Se, [o("div", Ce, [o("p", we, T(e.title), 1), e.supportingText ? (b(), a("p", Te, T(e.supportingText), 1)) : i("", !0)]), e.meta || e.trailing ? (b(), a("div", Ee, [e.meta ? (b(), a("p", De, T(e.meta), 1)) : i("", !0), e.trailing ? (b(), a("p", Oe, T(e.trailing), 1)) : i("", !0)])) : i("", !0)])]))), 128))]));
	}
}), [["__scopeId", "data-v-c4a016fb"]]), Ae = { class: "g-data-table__table" }, je = { class: "g-data-table__head" }, Me = { class: "g-data-table__head-row" }, Ne = ["title"], Pe = { class: "g-data-table__head-label" }, Fe = { class: "g-data-table__body" }, Ie = ["colspan"], Le = { class: "g-data-table__section-text" }, Re = ["title"], ze = { class: "g-data-table__cell-text" }, Be = /*#__PURE__*/ F(/* @__PURE__ */ u({
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
		return (t, E) => (b(), a("div", { class: m(["g-data-table", [`g-data-table--layout-${n.layout}`, { "g-data-table--row-hover": n.rowHover }]]) }, [o("table", Ae, [
			o("colgroup", null, [(b(!0), a(e, null, S(n.columns, (e) => (b(), a("col", {
				key: e.key,
				style: g(y(e))
			}, null, 4))), 128))]),
			o("thead", je, [o("tr", Me, [(b(!0), a(e, null, S(n.columns, (e, n) => (b(), a("th", {
				key: e.key,
				class: m(["g-data-table__head-cell", [
					`g-data-table__head-cell--${_(e)}`,
					`g-data-table__head-cell--overflow-${v(e)}`,
					{ "g-data-table__head-cell--muted": e.muted }
				]]),
				scope: "col",
				title: v(e) === "ellipsis" ? e.label : void 0
			}, [C(t.$slots, `header-${e.key}`, f({ ref_for: !0 }, x(e, n)), () => [C(t.$slots, "header", f({ ref_for: !0 }, x(e, n)), () => [o("span", Pe, T(e.label), 1)], !0)], !0)], 10, Ne))), 128))])]),
			o("tbody", Fe, [(b(!0), a(e, null, S(n.rows, (y, x) => (b(), a(e, { key: r(y, x) }, [l(y) ? (b(), a("tr", {
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
			}, () => [o("span", Le, T(d(y)), 1)], !0)], 8, Ie)], 6)) : (b(), a("tr", {
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
			}, [C(t.$slots, `cell-${e.key}`, f({ ref_for: !0 }, w(y, e, x, n)), () => [C(t.$slots, "cell", f({ ref_for: !0 }, w(y, e, x, n)), () => [o("span", ze, T(s(i(y, e.key))), 1)], !0)], !0)], 10, Re))), 128))], 6))], 64))), 128))])
		])], 2));
	}
}), [["__scopeId", "data-v-2b807707"]]), Ve = { class: "g-data-grid" }, He = {
	key: 0,
	class: "g-data-grid__toolbar"
}, Ue = {
	key: 0,
	class: "g-data-grid__filters"
}, We = {
	key: 1,
	class: "g-data-grid__visibility"
}, Ge = { class: "g-data-grid__visibility-list" }, Ke = { class: "g-data-grid__toolbar-actions" }, qe = {
	key: 1,
	class: "g-data-grid__empty"
}, Je = { class: "g-data-grid__head-content" }, Ye = ["aria-label", "onClick"], Xe = { class: "g-data-grid__head-label" }, Ze = {
	class: "g-data-grid__sort-indicator",
	"aria-hidden": "true"
}, Qe = {
	key: 1,
	class: "g-data-grid__head-label"
}, $e = ["onKeydown", "onPointerdown"], et = { class: "g-data-table__cell-text" }, tt = /*#__PURE__*/ F(/* @__PURE__ */ u({
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
		let f = t, p = u, g = ee(), v = x(f.sort), y = x({ ...f.filters }), w = x(F(f.columns, f.hiddenColumnKeys)), E = x({ ...f.columnWidths }), D = x(null);
		k(() => f.sort, (e) => {
			v.value = e ?? null;
		}), k(() => f.filters, (e) => {
			y.value = { ...e };
		}, { deep: !0 }), k(() => f.hiddenColumnKeys, (e) => {
			w.value = F(f.columns, e);
		}, { deep: !0 }), k(() => f.columnWidths, (e) => {
			E.value = { ...e };
		}, { deep: !0 }), k(() => f.columns, (e) => {
			w.value = F(e, w.value);
		}, { deep: !0 });
		let O = n(() => f.columns.filter((e) => !w.value.includes(e.key)).map((e) => ({
			...e,
			width: E.value[e.key] ?? e.width
		}))), j = n(() => O.value.filter((e) => e.filterable)), M = n(() => f.columns.filter((e) => e.hideable)), N = n(() => !!g.toolbar || j.value.length > 0 || M.value.length > 0), P = n(() => ne(f.rows.filter((e) => z(e, y.value)), v.value));
		_(() => {
			Z();
		});
		function F(e, t = []) {
			let n = new Set(t);
			for (let t of e) t.defaultHidden && n.add(t.key);
			return [...n];
		}
		function L(e) {
			return e == null ? "" : String(e).trim().toLowerCase();
		}
		function z(e, t) {
			return Object.entries(t).every(([t, n]) => {
				let r = L(n);
				return !r || L(e[t]).includes(r);
			});
		}
		function te(e, t) {
			return typeof e == "number" && typeof t == "number" ? e - t : typeof e == "boolean" && typeof t == "boolean" ? Number(e) - Number(t) : L(e).localeCompare(L(t), "ru");
		}
		function ne(e, t) {
			if (!t) return e;
			let n = t.direction === "asc" ? 1 : -1;
			return e.map((e, t) => ({
				row: e,
				index: t
			})).sort((e, r) => {
				let i = te(e.row[t.key], r.row[t.key]);
				return i === 0 ? e.index - r.index : i * n;
			}).map((e) => e.row);
		}
		function B(e) {
			return v.value?.key === e ? v.value.direction : null;
		}
		function V(e) {
			let t = B(e);
			return t === "asc" ? "↑" : t === "desc" ? "↓" : "↕";
		}
		function U(e) {
			v.value = e, p("update:sort", e);
		}
		function W(e) {
			if (!e.sortable) return;
			let t = v.value;
			if (!t || t.key !== e.key) {
				U({
					key: e.key,
					direction: "asc"
				});
				return;
			}
			if (t.direction === "asc") {
				U({
					key: e.key,
					direction: "desc"
				});
				return;
			}
			U(null);
		}
		function G(e, t) {
			let n = { ...y.value };
			t.trim() ? n[e] = t : delete n[e], y.value = n, p("update:filters", n);
		}
		function K(e) {
			w.value = e, p("update:hiddenColumnKeys", e);
		}
		function q(e, t) {
			let n = new Set(w.value);
			t ? n.delete(e) : n.add(e), K([...n]);
		}
		function J(e) {
			E.value = e, p("update:columnWidths", e);
		}
		function re() {
			ie({});
		}
		function ie(e) {
			y.value = e, p("update:filters", e);
		}
		function ae() {
			U(null), ie({}), K(F(f.columns)), J({});
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
			J({
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
			J({
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
				setColumnVisibility: q,
				setFilter: G,
				setSort: U,
				sort: v.value,
				toggleSort: W,
				visibleColumns: O.value
			};
		}
		function fe(e, t) {
			return {
				...e,
				sort: v.value,
				sortDirection: B(t.key),
				toggleSort: W
			};
		}
		function pe(e) {
			return {
				...e,
				sort: v.value
			};
		}
		return (t, n) => (b(), a("section", Ve, [N.value ? (b(), a("div", He, [C(t.$slots, "toolbar", h(d(de())), () => [
			j.value.length > 0 ? (b(), a("div", Ue, [(b(!0), a(e, null, S(j.value, (e) => (b(), r(H, {
				key: e.key,
				label: e.label,
				"model-value": y.value[e.key] ?? "",
				placeholder: "Фильтр",
				size: "sm",
				"onUpdate:modelValue": (t) => G(e.key, t)
			}, null, 8, [
				"label",
				"model-value",
				"onUpdate:modelValue"
			]))), 128))])) : i("", !0),
			M.value.length > 0 ? (b(), a("div", We, [n[0] ||= o("p", { class: "g-data-grid__toolbar-title" }, "Колонки", -1), o("div", Ge, [(b(!0), a(e, null, S(M.value, (e) => (b(), a("div", {
				key: e.key,
				class: "g-data-grid__visibility-item"
			}, [l(R, {
				"model-value": !w.value.includes(e.key),
				"aria-label": `Показать колонку ${e.label}`,
				"onUpdate:modelValue": (t) => q(e.key, t)
			}, null, 8, [
				"model-value",
				"aria-label",
				"onUpdate:modelValue"
			]), o("span", null, T(e.label), 1)]))), 128))])])) : i("", !0),
			o("div", Ke, [l(I, {
				size: "sm",
				onClick: ae
			}, {
				default: A(() => [...n[1] ||= [c("Сбросить вид", -1)]]),
				_: 1
			}), Object.keys(y.value).length > 0 ? (b(), r(I, {
				key: 0,
				size: "sm",
				variant: "secondary",
				onClick: re
			}, {
				default: A(() => [...n[2] ||= [c(" Очистить фильтры ", -1)]]),
				_: 1
			})) : i("", !0)])
		], !0)])) : i("", !0), O.value.length === 0 ? (b(), a("div", qe, " Скрыты все колонки. Покажите хотя бы одну колонку в настройках вида. ")) : (b(), r(Be, {
			key: 2,
			columns: O.value,
			layout: f.layout,
			"row-hover": f.rowHover,
			rows: P.value
		}, s({ _: 2 }, [S(O.value, (e) => ({
			name: `header-${e.key}`,
			fn: A((n) => [C(t.$slots, `header-${e.key}`, h(d(fe(n, e))), () => [C(t.$slots, "header", h(d(fe(n, e))), () => [o("div", Je, [e.sortable ? (b(), a("button", {
				key: 0,
				type: "button",
				class: m(["g-data-grid__sort-button", { "g-data-grid__sort-button--active": B(e.key) !== null }]),
				"aria-label": `Сменить сортировку по колонке ${e.label}`,
				onClick: (t) => W(e)
			}, [o("span", Xe, T(e.label), 1), o("span", Ze, T(V(e.key)), 1)], 10, Ye)) : (b(), a("span", Qe, T(e.label), 1)), e.resizable ? (b(), a("span", {
				key: 2,
				class: "g-data-grid__resize-handle",
				"aria-label": "Изменить ширину колонки",
				role: "separator",
				tabindex: "0",
				onKeydown: (t) => ue(t, e),
				onPointerdown: (t) => ce(t, e)
			}, null, 40, $e)) : i("", !0)])], !0)], !0)])
		})), S(O.value, (e) => ({
			name: `cell-${e.key}`,
			fn: A((n) => [C(t.$slots, `cell-${e.key}`, h(d(pe(n))), () => [C(t.$slots, "cell", h(d(pe(n))), () => [o("span", et, T(n.text), 1)], !0)], !0)])
		}))]), 1032, [
			"columns",
			"layout",
			"row-hover",
			"rows"
		]))]));
	}
}), [["__scopeId", "data-v-2e5bc0d1"]]), nt = { class: "g-property-list" }, rt = { class: "g-property-list__label" }, it = { class: "g-property-list__value" }, at = /*#__PURE__*/ F(/* @__PURE__ */ u({
	__name: "PropertyList",
	props: { items: {} },
	setup(t) {
		let n = t;
		function r(e, t) {
			return e.key ?? `${e.label}-${t}`;
		}
		return (t, i) => (b(), a("dl", nt, [(b(!0), a(e, null, S(n.items, (e, t) => (b(), a("div", {
			key: r(e, t),
			class: "g-property-list__row"
		}, [o("dt", rt, T(e.label), 1), o("dd", it, T(e.value), 1)]))), 128))]));
	}
}), [["__scopeId", "data-v-100011a3"]]), ot = ["aria-labelledby", "aria-label"], st = {
	key: 0,
	class: "g-base-dialog__header"
}, ct = ["aria-label"], lt = { class: "g-base-dialog__body" }, ut = {
	key: 1,
	class: "g-base-dialog__footer"
}, Q = 0, dt = "", ft = 0, $ = [], pt = /* @__PURE__ */ new Map(), mt = /*#__PURE__*/ F(/* @__PURE__ */ u({
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
		ft += 1;
		let l = ft, u = `g-base-dialog-title-${l}`, d = e, f = s, m = ee(), h = x(null), g = x(null), _ = x(!1), S = x(!1), w = null, E = n(() => !!(d.title || m.title)), D = n(() => E.value || d.showCloseButton), O = n(() => !!m.footer), A = n(() => E.value ? void 0 : d.ariaLabel || "Dialog");
		function j() {
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
			pt.get(e)?.();
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
		function L() {
			typeof document > "u" || _.value || (Q === 0 && (dt = document.body.style.overflow), Q += 1, document.body.style.overflow = "hidden", _.value = !0);
		}
		function R() {
			S.value ||= ($.push(l), !0);
		}
		function z() {
			typeof document > "u" || !_.value || (Q = Math.max(0, Q - 1), Q === 0 && (document.body.style.overflow = dt), _.value = !1);
		}
		function te() {
			if (!S.value) return;
			let e = $.lastIndexOf(l);
			e !== -1 && $.splice(e, 1), S.value = !1;
		}
		function ne() {
			let e = w;
			w = null, p(() => {
				if (e?.isConnected) {
					e.focus();
					return;
				}
				F();
			});
		}
		function B() {
			typeof document < "u" && !S.value && (w = document.activeElement instanceof HTMLElement ? document.activeElement : null), R(), L();
		}
		function V() {
			let e = j();
			te(), z(), e && ne();
		}
		function H(e) {
			f("update:modelValue", !1), f("close", e);
		}
		function U() {
			d.closeOnBackdrop && H("backdrop");
		}
		function W(e) {
			if (!(!d.modelValue || !j())) {
				if (e.key === "Tab") {
					I(e);
					return;
				}
				e.key === "Escape" && d.closeOnEscape && (e.preventDefault(), H("escape"));
			}
		}
		return k(() => d.modelValue, async (e, t) => {
			if (e) {
				B(), await p(), P();
				return;
			}
			t && V();
		}, { immediate: !0 }), v(() => {
			pt.set(l, P), document.addEventListener("keydown", W);
		}), y(() => {
			pt.delete(l), document.removeEventListener("keydown", W), V();
		}), (n, s) => (b(), r(t, { to: "body" }, [e.modelValue ? (b(), a("div", {
			key: 0,
			class: "g-base-dialog",
			onClick: M(U, ["self"])
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
			D.value ? (b(), a("header", st, [E.value ? (b(), a("h2", {
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
				onClick: s[0] ||= (e) => H("close-button")
			}, [...s[1] ||= [o("span", {
				class: "g-base-dialog__close-icon",
				"aria-hidden": "true"
			}, null, -1)]], 8, ct)) : i("", !0)])) : i("", !0),
			o("div", lt, [C(n.$slots, "default", {}, void 0, !0)]),
			O.value ? (b(), a("footer", ut, [C(n.$slots, "footer", {}, void 0, !0)])) : i("", !0)
		], 8, ot)])) : i("", !0)]));
	}
}), [["__scopeId", "data-v-e5ff3e47"]]), ht = { class: "g-confirm-dialog" }, gt = {
	key: 0,
	class: "g-confirm-dialog__description"
}, _t = /*#__PURE__*/ F(/* @__PURE__ */ u({
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
		return (t, f) => (b(), r(mt, {
			"model-value": e.modelValue,
			title: e.title,
			"aria-label": e.ariaLabel,
			"close-on-backdrop": e.closeOnBackdrop,
			"close-on-escape": e.closeOnEscape,
			"show-close-button": e.showCloseButton,
			"onUpdate:modelValue": f[0] ||= (e) => n("update:modelValue", e),
			onClose: d
		}, {
			footer: A(() => [C(t.$slots, "footer", {}, () => [l(I, {
				disabled: e.cancelDisabled,
				onClick: s
			}, {
				default: A(() => [c(T(e.cancelText), 1)]),
				_: 1
			}, 8, ["disabled"]), l(I, {
				variant: e.confirmVariant,
				disabled: e.confirmDisabled,
				onClick: u
			}, {
				default: A(() => [c(T(e.confirmText), 1)]),
				_: 1
			}, 8, ["variant", "disabled"])], !0)]),
			default: A(() => [o("div", ht, [e.description ? (b(), a("p", gt, T(e.description), 1)) : i("", !0), C(t.$slots, "default", {}, void 0, !0)])]),
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
}), [["__scopeId", "data-v-b60e1d7f"]]), vt = ["id", "aria-busy"], yt = {
	key: 0,
	class: "g-form-dialog__description"
}, bt = { class: "g-form-dialog__body" }, xt = 0, St = /*#__PURE__*/ F(/* @__PURE__ */ u({
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
		xt += 1;
		let s = xt, u = e, d = t, f = n(() => u.formId || `g-form-dialog-form-${s}`), p = n(() => u.submitDisabled || u.submitting), m = n(() => u.cancelDisabled || u.submitting);
		function h() {
			m.value || (d("cancel"), d("update:modelValue", !1));
		}
		function g(e) {
			p.value || d("submit", e);
		}
		function _(e) {
			d("close", e);
		}
		return (t, n) => (b(), r(mt, {
			"model-value": e.modelValue,
			title: e.title,
			"aria-label": e.ariaLabel,
			"close-on-backdrop": e.closeOnBackdrop,
			"close-on-escape": e.closeOnEscape,
			"show-close-button": e.showCloseButton,
			"onUpdate:modelValue": n[0] ||= (e) => d("update:modelValue", e),
			onClose: _
		}, {
			footer: A(() => [C(t.$slots, "footer", {}, () => [l(I, {
				disabled: m.value,
				onClick: h
			}, {
				default: A(() => [c(T(e.cancelText), 1)]),
				_: 1
			}, 8, ["disabled"]), l(I, {
				variant: "primary",
				type: "submit",
				form: f.value,
				disabled: p.value
			}, {
				default: A(() => [c(T(e.submitText), 1)]),
				_: 1
			}, 8, ["form", "disabled"])], !0)]),
			default: A(() => [o("form", {
				id: f.value,
				class: "g-form-dialog",
				"aria-busy": e.submitting || void 0,
				onSubmit: M(g, ["prevent"])
			}, [e.description ? (b(), a("p", yt, T(e.description), 1)) : i("", !0), o("div", bt, [C(t.$slots, "default", {}, void 0, !0)])], 40, vt)]),
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
}), [["__scopeId", "data-v-ca2ec71d"]]), Ct = /*#__PURE__*/ F(/* @__PURE__ */ u({
	__name: "Surface",
	props: { as: { default: "section" } },
	setup(e) {
		return (t, n) => (b(), r(w(e.as), { class: "g-surface" }, {
			default: A(() => [C(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}));
	}
}), [["__scopeId", "data-v-9ac2efdf"]]), wt = /* @__PURE__ */ u({
	name: "Panel",
	__name: "Panel",
	props: { as: { default: "section" } },
	setup(e) {
		return (t, n) => (b(), r(Ct, { as: e.as }, {
			default: A(() => [C(t.$slots, "default")]),
			_: 3
		}, 8, ["as"]));
	}
});
//#endregion
export { I as BaseButton, R as BaseCheckbox, mt as BaseDialog, H as BaseInput, U as BaseLink, G as BaseRadio, le as BaseSelect, ue as BaseSlider, ge as BaseSwitch, be as BaseTextarea, _t as ConfirmDialog, tt as DataGrid, ke as DataList, Be as DataTable, St as FormDialog, wt as Panel, at as PropertyList, Ct as Surface };
