package com.model;

import java.util.ArrayList;
import java.util.List;

public class SkillData {

    private static Skill skill1 = new Skill(
            "68428a4a-b992-42ac-afe2-2a3e11c54bef",
            "teamwork"
    );

    private static Skill skill2 = new Skill(
            "fdcd63fb-ef7a-4d73-86b4-2571bb15f3a",
            "creativity"
    );

    private static List<Skill> skills = new ArrayList<>();

    static {
        skills.add(skill1);
        skills.add(skill2);
    }

    public static List<Skill> getSkillsData() {
        return skills;
    }
}
