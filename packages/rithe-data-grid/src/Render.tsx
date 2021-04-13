import { Render as PluginRender } from '@rithe/plugin'
import { TemplateBaseProps } from "./TemplateBaseProps"

interface RenderWithoutProps<T extends keyof TemplateBaseProps> {
    name: T,
}

interface RenderWithProps<T extends keyof TemplateBaseProps> {
    name: T,
    props: TemplateBaseProps[T],
}

export type RenderProps<T extends keyof TemplateBaseProps> = TemplateBaseProps[T] extends undefined ? RenderWithoutProps<T> : RenderWithProps<T>

interface OverrideWithoutProps<T extends keyof TemplateBaseProps> {
    override: T,
}

interface OverrideWithProps<T extends keyof TemplateBaseProps> {
    override: T,
    props: Partial<TemplateBaseProps[T]>,
}

export type OverrideProps<T extends keyof TemplateBaseProps> = TemplateBaseProps[T] extends undefined ? OverrideWithoutProps<T> : OverrideWithProps<T>

export const Render = PluginRender as <T extends keyof TemplateBaseProps>(props: RenderProps<T> | OverrideProps<T> | Record<string, never>) => JSX.Element