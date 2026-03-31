package com.pbe.projetofinal.repository;

import com.pbe.projetofinal.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
}
