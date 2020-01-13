package hu.molnaran.todobackend.repository;

import hu.molnaran.todobackend.model.Todo;
import hu.molnaran.todobackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);
    /*
    @Query("SCRIPT TO fileName")
    void dump();

     */
}
