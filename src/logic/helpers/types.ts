import { namedTypes } from 'ast-types/gen/namedTypes'
import { PluginOptions } from '../../types'

export type MemberType = 'method' | 'property'

export interface Options {
  pluginOptions: PluginOptions
  getStaticMethods: boolean
  memberType: MemberType
}

export interface MemberAccessibilityGroup {
  public: namedTypes.ClassBody['body'] | null
  private: namedTypes.ClassBody['body'] | null
  protected: namedTypes.ClassBody['body'] | null
}

export type ClassBody = namedTypes.ClassBody['body'] extends (infer U)[]
  ? U
  : never
