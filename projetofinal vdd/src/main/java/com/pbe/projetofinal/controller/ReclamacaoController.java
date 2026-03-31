package com.pbe.projetofinal.controller;

import com.pbe.projetofinal.model.Reclamacao;
import com.pbe.projetofinal.repository.ReclamacaoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.*;

    @Controller
    public class ReclamacaoController {

        @Autowired
        private ReclamacaoRepository reclamacaoRepository;


        // ==============================
        // LISTAGEM ( /reclamacao/listagem )
        // ==============================
        @GetMapping("/reclamacao/listagem")
        public String listagem(Model model) {
            model.addAttribute("reclamacoes", reclamacaoRepository.findAll());
            return "listagem";
        }

        // ==============================
        // CADASTRO ( /reclamacao/cadastro )
        // ==============================
        @GetMapping("/reclamacao/cadastro")
        public String cadastro(Model model) {
            model.addAttribute("reclamacao", new Reclamacao());
            return "cadastro";
        }

        // ==============================
        // SALVAR (POST /reclamacao/salvar)
        // ==============================
        @PostMapping("/reclamacao/salvar")
        public String salvar(@Valid Reclamacao reclamacao, BindingResult result) {

            if (result.hasErrors()) {
                return "cadastro";
            }

            reclamacaoRepository.save(reclamacao);
            return "redirect:/reclamacao/listagem";
        }

        // ==============================
        // EXCLUIR ( /reclamacao/excluir/{id} )
        // ==============================
        @GetMapping("/reclamacao/excluir/{id}")
        public String excluir(@PathVariable Long id) {
            reclamacaoRepository.deleteById(id);
            return "redirect:/reclamacao/listagem";
        }
    }
