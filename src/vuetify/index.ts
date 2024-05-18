import 'vuetify/styles'
import {Blueprint, createVuetify, type ThemeDefinition} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {md1, md2, md3} from 'vuetify/blueprints'


const blueprint = localStorage.getItem('theme') || 'md1'
const pk_color = localStorage.getItem('pk_color')

const ThemeMap = new Map<string, Blueprint>([
    ['md1', md1],
    ['md2', md2],
    ['md3', md3],
])

let custom: ThemeDefinition;

if (pk_color !== null && pk_color.length > 0) {
    custom = {
        dark: false,
        colors: {
            primary: pk_color
        }
    }
} else {
    custom = {
        dark: false,
    }
}

const vuetify = createVuetify({
    components,
    directives,
    blueprint: ThemeMap.get(blueprint) || md1,
    theme: {
        defaultTheme: 'custom',
        themes: {
            custom
        }
    }
})


export default vuetify