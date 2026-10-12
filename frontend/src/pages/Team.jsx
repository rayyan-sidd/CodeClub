import { useState } from "react";
import { Link } from "react-router-dom";
import { teamMembers } from "../data/teamMembers";
import TeamMemberCard from "../components/TeamMemberCard";
import MemberProfileModal from "../components/MemberProfileModal";
import { Sparkles, Users, ArrowRight, ShieldCheck, Award } from "lucide-react";

export default function Team() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);

  const advisors = teamMembers.filter((m) => m.category === "advisor");
  const coordinators = teamMembers.filter((m) => m.category === "coordinator");
  const members = teamMembers.filter((m) => m.category === "member");

  const filteredMembers =
    activeCategory === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.category === activeCategory);

  const handlePrevMember = () => {
    if (!selectedMember) return;
    const currentIndex = teamMembers.findIndex((m) => m.id === selectedMember.id);
    const prevIndex = currentIndex === 0 ? teamMembers.length - 1 : currentIndex - 1;
    setSelectedMember(teamMembers[prevIndex]);
  };

  const handleNextMember = () => {
    if (!selectedMember) return;
    const currentIndex = teamMembers.findIndex((m) => m.id === selectedMember.id);
    const nextIndex = currentIndex === teamMembers.length - 1 ? 0 : currentIndex + 1;
    setSelectedMember(teamMembers[nextIndex]);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3.5 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Minds Behind the Club</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-text tracking-tight mb-4">
          Meet Our Team
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Faculty mentors, student leads, and enthusiastic core members working together
          to foster innovation, engineering excellence, and campus tech culture at Integral University.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
        {[
          { id: "all", label: "All Members" },
          { id: "advisor", label: "Faculty Advisors" },
          { id: "coordinator", label: "Coordinators & Leads" },
          { id: "member", label: "Core Members" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeCategory === tab.id
                ? "bg-brand-accent text-brand-bg font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* When filtering by All, display structured sections */}
      {activeCategory === "all" ? (
        <div className="space-y-16">
          {/* Section 1: Faculty Advisors */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-8">
              <ShieldCheck className="w-5 h-5 text-brand-accent" />
              <h2 className="text-xl sm:text-2xl font-bold text-brand-text">
                Faculty Advisors
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-6">
              {advisors.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  department={member.department}
                  photo={member.image}
                  github={member.github}
                  linkedin={member.linkedin}
                  featured
                  onClick={() => setSelectedMember(member)}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Student Coordinator */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Award className="w-5 h-5 text-brand-accent" />
              <h2 className="text-xl sm:text-2xl font-bold text-brand-text">
                Student Coordinator
              </h2>
            </div>
            <div className="flex justify-center max-w-sm mx-auto">
              {coordinators.map((member) => (
                <div key={member.id} className="w-full max-w-xs">
                  <TeamMemberCard
                    name={member.name}
                    role={member.role}
                    department={member.department}
                    photo={member.image}
                    github={member.github}
                    linkedin={member.linkedin}
                    featured
                    onClick={() => setSelectedMember(member)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Core Members */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Users className="w-5 h-5 text-brand-accent" />
              <h2 className="text-xl sm:text-2xl font-bold text-brand-text">
                Core Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {members.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  department={member.department}
                  photo={member.image}
                  github={member.github}
                  linkedin={member.linkedin}
                  onClick={() => setSelectedMember(member)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Filtered Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              name={member.name}
              role={member.role}
              department={member.department}
              photo={member.image}
              github={member.github}
              linkedin={member.linkedin}
              featured={member.category !== "member"}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>
      )}

      {/* Join the Team CTA */}
      <div className="mt-20 bg-brand-surface border border-brand-border rounded-2xl p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-xl">
        <h3 className="text-2xl font-bold text-brand-text mb-2">
          Want to Be Part of the Organizing Team?
        </h3>
        <p className="text-sm text-brand-muted max-w-lg mx-auto mb-6">
          We are constantly on the lookout for passionate developers, designers, video editors,
          and organizers to help manage campus events and workshops.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent hover:bg-[#0d9668] text-brand-bg font-semibold rounded-xl text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
        >
          <span>Apply for Next Semester Recruitment</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Discord Style Profile Modal */}
      {selectedMember && (
        <MemberProfileModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          onPrev={handlePrevMember}
          onNext={handleNextMember}
        />
      )}
    </section>
  );
}
