export type SectionType = "about" | "skills" | "projects" | "contact";

type Table<Row, Insert, Update = Partial<Insert>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<
        {
          id: string;
          email: string;
          role: "admin";
          created_at: string;
        },
        {
          id: string;
          email: string;
          role?: "admin";
          created_at?: string;
        }
      >;
      site_settings: Table<
        {
          id: 1;
          name: string;
          role: string;
          tagline: string;
          hero_headline: string;
          hero_primary_label: string;
          hero_secondary_label: string;
          email: string;
          whatsapp: string;
          location: string;
          github_url: string;
          github_handle: string;
          linkedin_url: string;
          linkedin_handle: string;
          resume_url: string | null;
          resume_filename: string | null;
          profile_image_url: string | null;
          page_title: string;
          meta_description: string;
          updated_at: string;
        },
        {
          id?: 1;
          name?: string;
          role?: string;
          tagline?: string;
          hero_headline?: string;
          hero_primary_label?: string;
          hero_secondary_label?: string;
          email?: string;
          whatsapp?: string;
          location?: string;
          github_url?: string;
          github_handle?: string;
          linkedin_url?: string;
          linkedin_handle?: string;
          resume_url?: string | null;
          resume_filename?: string | null;
          profile_image_url?: string | null;
          page_title?: string;
          meta_description?: string;
          updated_at?: string;
        }
      >;
      sections: Table<
        {
          id: string;
          type: SectionType;
          title: string;
          description: string;
          body_paragraphs: string[];
          order_index: number;
          visible: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          type: SectionType;
          title?: string;
          description?: string;
          body_paragraphs?: string[];
          order_index?: number;
          visible?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      about_stats: Table<
        {
          id: string;
          section_id: string;
          label: string;
          value: string;
          order_index: number;
        },
        {
          id?: string;
          section_id: string;
          label: string;
          value: string;
          order_index?: number;
        }
      >;
      skill_groups: Table<
        {
          id: string;
          section_id: string;
          category: string;
          items: string[];
          order_index: number;
        },
        {
          id?: string;
          section_id: string;
          category: string;
          items?: string[];
          order_index?: number;
        }
      >;
      projects: Table<
        {
          id: string;
          title: string;
          slug: string | null;
          description: string;
          technologies: string[];
          category: string;
          status: string;
          github_url: string | null;
          live_url: string | null;
          project_url: string | null;
          featured: boolean;
          order_index: number;
          visible: boolean;
          created_at: string;
          updated_at: string;
        },
        {
          id?: string;
          title: string;
          slug?: string | null;
          description?: string;
          technologies?: string[];
          category?: string;
          status?: string;
          github_url?: string | null;
          live_url?: string | null;
          project_url?: string | null;
          featured?: boolean;
          order_index?: number;
          visible?: boolean;
          created_at?: string;
          updated_at?: string;
        }
      >;
      project_images: Table<
        {
          id: string;
          project_id: string;
          url: string;
          alt_text: string;
          order_index: number;
        },
        {
          id?: string;
          project_id: string;
          url: string;
          alt_text?: string;
          order_index?: number;
        }
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
export type Section = Database["public"]["Tables"]["sections"]["Row"];
export type AboutStat = Database["public"]["Tables"]["about_stats"]["Row"];
export type SkillGroup = Database["public"]["Tables"]["skill_groups"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectImage = Database["public"]["Tables"]["project_images"]["Row"];
