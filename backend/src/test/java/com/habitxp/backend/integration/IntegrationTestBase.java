package com.habitxp.backend.integration;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class IntegrationTestBase {

    @Autowired
    protected MongoTemplate mongoTemplate;

    @Value("${test.database.cleanup:true}")  // default: cleanup aktiv
    private boolean cleanup;

    @BeforeAll
    void beforeAll() {
        if (cleanup) {
            System.out.println("Initial database cleanup before tests");
            mongoTemplate.getDb().drop();
        } else {
            System.out.println("Database cleanup disabled (debug mode)");
        }
    }

    @AfterAll
    void afterAll() {
        if (cleanup) {
            System.out.println("Final database cleanup after tests");
            mongoTemplate.getDb().drop();
        }
    }
}