package de.sambalmueslie.openbooking.backend.export.excel


import builders.dsl.spreadsheet.api.FontStyle
import builders.dsl.spreadsheet.builder.api.CanDefineStyle
import builders.dsl.spreadsheet.builder.api.Stylesheet
import org.slf4j.Logger
import org.slf4j.LoggerFactory


class OfferExcelStylesheet : Stylesheet {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(OfferExcelStylesheet::class.java)
        const val STYLE_HEADER = "header"
    }

    override fun declareStyles(stylable: CanDefineStyle) {
        stylable.style(STYLE_HEADER) { st -> st.font { f -> f.style(FontStyle.BOLD) } }
    }

}
