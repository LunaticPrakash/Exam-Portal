package com.project.examportalbackend.models;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "quiz_results")
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizResId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "total_obtained_marks")
    private float totalObtainedMarks;

    @Column(name = "attempt_datetime")
    private String attemptDatetime;

    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;


}
